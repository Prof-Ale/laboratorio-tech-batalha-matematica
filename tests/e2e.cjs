/**
 * tests/e2e.cjs: joga a Batalha de verdade num navegador (Chromium) e confere o resultado.
 * Uso: node tests/e2e.cjs   (precisa do pacote "playwright" com o Chromium instalado)
 * Sobe sozinho um servidor local na porta 8791.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const raiz = path.resolve(__dirname, '..');
const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4' };
const servidor = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const arq = path.join(raiz, url === '/' ? 'index.html' : url);
  if (!arq.startsWith(raiz) || !fs.existsSync(arq) || fs.statSync(arq).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': tipos[path.extname(arq)] || 'application/octet-stream' });
  fs.createReadStream(arq).pipe(res);
});

let falhas = 0, passou = 0;
const ok = (c, m) => { if (c) passou++; else { falhas++; console.error('FALHOU:', m); } };
const BASE = 'http://localhost:8791/';

async function pagina(browser, { w = 1920, h = 1080, cfg = {}, relogio = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  p.erros = [];
  p.on('pageerror', e => p.erros.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_TUNNEL|ERR_NAME|Failed to load resource/.test(m.text())) p.erros.push(m.text()); });
  await p.addInitScript((c) => {
    if (window.speechSynthesis) window.speechSynthesis.speak = () => {};
    if (!sessionStorage.getItem('cfgok')) { sessionStorage.setItem('cfgok', '1'); localStorage.setItem('labtech_v7_cfg', JSON.stringify(c)); }
  }, cfg);
  if (relogio) await p.clock.install();
  await p.goto(BASE);
  return p;
}
const entrar = async (p) => { await p.click('#form-times button[type=submit]'); await p.waitForSelector('#tela-central:not(.oculto)'); };

// descobre qual alternativa está certa, lendo o banco dentro da própria página
const indiceCerto = (p, fonte) => p.evaluate(async (fonte) => {
  const B = await import('/js/banco.js');
  const texto = document.getElementById('enunciado').textContent;
  let pool = [];
  if (fonte.tipo === 'bloco') pool = B.poolDoBloco(fonte.n);
  else pool = await B.poolDoAssunto(fonte.id);
  const q = pool.find(x => x.q.replace(/\^(\([^)]*\)|[−-]?(?:\d+|[a-z]))/g, (m, g) => g.replace(/^\(|\)$/g, '')) === texto || x.q === texto);
  if (!q) return -1;
  const alvo = q.o[q.c].replace(/\^(\([^)]*\)|[−-]?(?:\d+|[a-z]))/g, (m, g) => g.replace(/^\(|\)$/g, ''));
  return [...document.querySelectorAll('.alt .txt')].findIndex(e => e.textContent === alvo);
}, fonte);

(async () => {
  await new Promise(r => servidor.listen(8791, r));
  const browser = await chromium.launch();
  try {
    // 1. Central e lista de assuntos
    let p = await pagina(browser);
    await entrar(p);
    ok(await p.locator('#painel-evento .cartao').count() === 5, 'cinco blocos do evento');
    await p.click('.aba[data-aba=assuntos]');
    await p.waitForSelector('#grade-assuntos .cartao');
    ok(await p.locator('#grade-assuntos .cartao').count() === 96, '96 assuntos do MathLab');
    await p.fill('#busca', 'equacao do 2');
    ok(await p.locator('#grade-assuntos .cartao').count() >= 1, 'busca sem acento acha equação do 2º grau');
    await p.fill('#busca', '');
    await p.click('#filtro-serie button >> nth=1');
    const so6 = await p.locator('#grade-assuntos .cartao .c-topo span:first-child').allTextContents();
    ok(so6.length > 0 && so6.every(t => t.startsWith('6')), 'filtro de série mostra só o 6º ano');
    ok(p.erros.length === 0, 'sem erros no console (central): ' + p.erros.join(' | '));
    await p.context().close();

    // 2. Batalha completa no banco do evento: a certa muda de lugar e alguém vence
    p = await pagina(browser, { cfg: { meta: 100 } });
    await entrar(p);
    await p.click('#painel-evento .cartao >> nth=0');
    await p.waitForSelector('#alternativas .alt');
    const posicoes = new Set();
    let fim = false;
    for (let i = 0; i < 120 && !fim; i++) {
      if (await p.isVisible('#m-fim.aberto')) { fim = true; break; }
      if (await p.isVisible('#btn-prox')) { await p.click('#btn-prox'); continue; }
      const c = await indiceCerto(p, { tipo: 'bloco', n: 1 });
      if (c < 0) { ok(false, 'questão do bloco 1 não achada no banco'); break; }
      posicoes.add(c);
      const errar = i % 5 === 4;
      await p.keyboard.press(String(((errar ? c + 1 : c) % 4) + 1));
      await p.waitForTimeout(40);
    }
    await p.waitForSelector('#m-fim.aberto', { timeout: 8000 });
    ok(posicoes.size >= 3, 'a alternativa certa muda de posição: ' + [...posicoes]);
    ok(/venceu|Empate/.test(await p.textContent('#fim-vencedor')), 'tela de resultado aparece');
    await p.click('#fim-menu');
    await p.click('.grupo-icones [data-abrir=m-relatorio]');
    ok((await p.textContent('#rel-conteudo')).includes('% de acerto'), 'relatório lista o assunto');
    ok(p.erros.length === 0, 'sem erros no console (batalha): ' + p.erros.join(' | '));
    await p.context().close();

    // 3. Banco do MathLab: dica custa pontos, explicação do erro aparece
    p = await pagina(browser, { cfg: { meta: 250, nivel: 1 } });
    await entrar(p);
    await p.click('.aba[data-aba=assuntos]');
    await p.fill('#busca', 'radicais');
    await p.click('#grade-assuntos .cartao >> nth=0');
    await p.waitForSelector('#alternativas .alt');
    const id = await p.evaluate(async () => (await (await fetch('data/banco/manifesto.json')).json()).assuntos.find(a => /Radicais/.test(a.nome)).id);
    await p.click('#btn-dica');
    ok(await p.locator('.dica').count() === 1, 'dica aparece ao pedir');
    const c = await indiceCerto(p, { tipo: 'assunto', id });
    ok(c >= 0, 'questão do MathLab achada no banco');
    await p.keyboard.press(String(c + 1));
    await p.waitForSelector('#retorno .res');
    ok(/\+12 pontos/.test(await p.textContent('#retorno')), 'acerto com 1 dica vale 10 + 5 − 3 = 12: ' + (await p.textContent('#retorno')).slice(0, 60));
    await p.click('#btn-prox');
    const c2 = await indiceCerto(p, { tipo: 'assunto', id });
    await p.keyboard.press(String(((c2 + 1) % 4) + 1));
    await p.waitForSelector('#retorno .tipo');
    ok((await p.textContent('#retorno .tipo')).startsWith('Tipo de erro:'), 'erro mostra o tipo de erro');
    await p.context().close();

    // 4. Buzzer
    p = await pagina(browser, { cfg: { modo: 'buzzer' } });
    await entrar(p);
    await p.click('#painel-evento .cartao >> nth=1');
    await p.waitForSelector('#alternativas .alt');
    await p.click('.alt >> nth=0');
    ok(/aperta A ou B/.test(await p.textContent('#aviso-turno')), 'sem buzzer, o clique pede A ou B');
    await p.keyboard.press('b');
    ok((await p.textContent('#aviso-turno')).includes('7ºB'), 'B aperta e ganha a vez');
    await p.context().close();

    // 5. Tempo esgotado (relógio falso)
    p = await pagina(browser, { cfg: { tempo: 20 }, relogio: true });
    await entrar(p);
    await p.click('#painel-evento .cartao >> nth=2');
    await p.waitForSelector('#alternativas .alt');
    await p.clock.runFor(21000);
    ok((await p.textContent('#retorno')).includes('O tempo acabou'), 'tempo esgotado encerra a rodada');
    await p.context().close();

    // 6. Funciona sem internet depois da primeira visita
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, serviceWorkers: 'allow' });
    p = await ctx.newPage();
    await p.goto(BASE);
    await p.evaluate(() => navigator.serviceWorker.ready);
    await p.reload();
    await p.waitForTimeout(500);
    await ctx.setOffline(true);
    await p.reload();
    ok(await p.isVisible('#tela-inicio'), 'abre sem internet');
    await p.click('#form-times button[type=submit]');
    await p.waitForSelector('#painel-evento .cartao');
    await p.click('#painel-evento .cartao >> nth=0');
    await p.waitForSelector('#alternativas .alt');
    ok(true, 'joga o banco do evento sem internet');
    await ctx.close();

    // 7. Celular: nada estoura a largura
    p = await pagina(browser, { w: 390, h: 844 });
    await entrar(p);
    await p.click('#painel-evento .cartao >> nth=0');
    await p.waitForSelector('#alternativas .alt');
    ok(!(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)), 'sem rolagem lateral no celular');
    await p.context().close();
  } catch (e) {
    falhas++; console.error('ERRO NO TESTE:', e.message);
  }
  await browser.close();
  servidor.close();
  console.log(`E2E: ${passou} verificações passaram, ${falhas} falharam`);
  process.exit(falhas ? 1 : 0);
})();
