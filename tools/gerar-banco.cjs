/**
 * tools/gerar-banco.cjs
 * Gera o banco de questões da Batalha a partir dos geradores do MathLab.
 *
 * Uso (precisa do Node e do pacote "playwright" com o Chromium instalado):
 *   node tools/gerar-banco.cjs ../MathLab/index.html [--por-gerador=8] [--saida=data/banco]
 *
 * Cada gerador do MathLab sorteia questões novas a cada chamada. Aqui sorteamos várias,
 * descartamos repetidas e questões que dependem de desenho, gráfico ou controle do simulador
 * (a Batalha não tem simulador), e gravamos um arquivo JSON por assunto.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const origem = path.resolve(args.find(a => !a.startsWith('--')) || '../MathLab/index.html');
const opt = (nome, padrao) => {
  const a = args.find(x => x.startsWith('--' + nome + '='));
  return a ? a.split('=')[1] : padrao;
};
const POR_GERADOR = Number(opt('por-gerador', 8));
const SAIDA = path.resolve(opt('saida', 'data/banco'));
const MINIMO = Number(opt('minimo', 18)); // assuntos com menos questões úteis ficam de fora

(async () => {
  fs.mkdirSync(SAIDA, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + origem);
  await p.waitForTimeout(1500);

  const resultado = await p.evaluate(({ POR_GERADOR }) => {
    // Palavras que indicam dependência de figura, simulador ou do próprio app.
    const FORTE = /desenho|figura|gráfico|grafico|simulador|imagem|ilustra|tabela|malha|diagrama|esboço|\bapp\b|arraste|deslize|clique|botão|controle deslizante/i;
    const FRACO = /veja|observe|ao lado|mostrad|desenhad|na tela|no plano|representad/i;
    const GEN_MS = 'Reveja o cálculo e tente de novo.';
    const GEN_H = 'Releia o enunciado e anote o que ele dá e o que ele pede.';
    // Sinal de menos verdadeiro (−) em vez do hífen, em contas e números negativos.
    const menos = (t) => String(t == null ? '' : t)
      .replace(/(^|[\s(=×÷+*/])-(?=[\d(])/g, '$1−')
      .replace(/\s-\s/g, ' − ');
    const limpa = (t) => menos(t);
    // Valida e limpa: dicas e explicações que citam figura são trocadas, o resto da questão fica.
    const preparar = (q) => {
      if (!q || typeof q.q !== 'string' || !Array.isArray(q.o) || q.o.length < 3) return null;
      if (!Number.isInteger(q.c) || q.c < 0 || q.c >= q.o.length) return null;
      const ops = q.o.map(limpa);
      if (new Set(ops).size !== ops.length) return null;
      const essencial = [q.q, ...ops, q.e].map(limpa).join(' ');
      if (FORTE.test(essencial)) return null;
      const suja = (t) => FORTE.test(t) || FRACO.test(t);
      let h = (q.h || []).map(limpa).filter(t => t && !suja(t));
      h = h.filter((t, i) => h.indexOf(t) === i);
      if (h.length === 0) h = [GEN_H];
      const ms = ops.map((_, i) => {
        const t = q.ms && q.ms[i];
        if (t == null) return null;
        return suja(limpa(t)) ? GEN_MS : limpa(t);
      });
      const tg = ops.map((_, i) => (q.tg && q.tg[i] != null) ? limpa(q.tg[i]) : null);
      const tudo = [essencial, ...h, ...ms.filter(Boolean)].join(' ');
      if (/NaN|undefined|null|Infinity/.test(tudo)) return null;
      return { q: q.q, o: ops, c: q.c, tg, ms, h, e: limpa(q.e) };
    };
    const saida = [];
    for (const m of MODS) {
      if (!m.gens) continue;
      const niveis = {};
      for (const lv of Object.keys(m.gens)) {
        const lista = [];
        const vistos = new Set();
        for (const g of m.gens[lv]) {
          let guardadas = 0;
          for (let t = 0; t < 60 && guardadas < POR_GERADOR; t++) {
            let q;
            try { q = g(); } catch (e) { continue; }
            const lim = preparar(q);
            if (!lim) continue;
            const chave = lim.q + '|' + lim.o.join('|');
            if (vistos.has(chave)) continue;
            vistos.add(chave);
            lista.push(lim);
            guardadas++;
          }
        }
        niveis[lv] = lista;
      }
      saida.push({
        id: m.id, ano: m.ano, eixo: m.eixo, nome: m.nome, sub: m.sub,
        bncc: m.bncc || [], niveis
      });
    }
    return saida;
  }, { POR_GERADOR });

  await b.close();

  const manifesto = [];
  const descartados = [];
  for (const m of resultado) {
    const total = Object.values(m.niveis).reduce((s, l) => s + l.length, 0);
    const minNivel = Math.min(...Object.values(m.niveis).map(l => l.length));
    if (total < MINIMO || minNivel < 3) { descartados.push(`${m.id} (${total})`); continue; }
    fs.writeFileSync(path.join(SAIDA, m.id + '.json'), JSON.stringify(m));
    manifesto.push({
      id: m.id, ano: m.ano, eixo: m.eixo, nome: m.nome, sub: m.sub, bncc: m.bncc,
      n: Object.fromEntries(Object.entries(m.niveis).map(([k, v]) => [k, v.length]))
    });
  }
  fs.writeFileSync(path.join(SAIDA, 'manifesto.json'), JSON.stringify({
    geradoEm: new Date().toISOString().slice(0, 10),
    fonte: 'MathLab',
    assuntos: manifesto
  }));
  const tot = manifesto.reduce((s, m) => s + Object.values(m.n).reduce((a, b) => a + b, 0), 0);
  console.log(`Assuntos no banco: ${manifesto.length} | questões: ${tot}`);
  console.log(`Ficaram de fora (dependem de figura): ${descartados.join(', ') || 'nenhum'}`);
})();
