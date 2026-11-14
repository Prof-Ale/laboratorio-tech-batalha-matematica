/**
 * js/main.js: telas e eventos da Batalha Matemática (v7.0).
 * As regras ficam em batalha.js, os dados em banco.js e o relatório em relatorio.js.
 */
import { ICONES } from './icones.js';
import * as B from './batalha.js';
import {
    poolDoBloco, poolDoAssunto, poolDaSerie, carregarManifesto,
    BLOCOS, EIXOS, EIXO_COR, rotuloAno
} from './banco.js';
import * as R from './relatorio.js';
import { sfx, tocarMusica, pararMusica, alternarMusica, alternarVoz, falar, calarVoz, audioEstado } from './audio.js';
import { lerConta, desenharReta, animarSalto } from './reta.js';

const $ = (id) => document.getElementById(id);
const CHAVE_CFG = 'labtech_v7_cfg';

/* ── Configuração (lembrada entre as visitas) ───────────── */
let cfg = { ...B.PADRAO };
try { Object.assign(cfg, JSON.parse(localStorage.getItem(CHAVE_CFG) || '{}')); } catch (e) { /* segue com o padrão */ }
const salvarCfg = () => { try { localStorage.setItem(CHAVE_CFG, JSON.stringify(cfg)); } catch (e) {} };

/* ── Estado da batalha em andamento ─────────────────────── */
let partida = null;
let fonteAtual = null;       // { tipo, rotulo, carregar() }
let dicasUsadas = 0;
let respondeu = false;
let buzzer = null;           // 'A' ou 'B' quando alguém apertou
let cronometro = null;
let tempoRestante = 0;
let errosDaPartida = {};
let musicaFinal = false;

/** Escreve texto seguro no elemento, trocando ^n por expoente (sobrescrito). */
function escrever(el, texto) {
    el.textContent = '';
    const re = /\^(\([^)]*\)|[−-]?(?:\d+|[a-z]))/g;
    let i = 0, m;
    const t = String(texto);
    while ((m = re.exec(t))) {
        if (m.index > i) el.append(t.slice(i, m.index));
        const sup = document.createElement('sup');
        sup.textContent = m[1].replace(/^\(|\)$/g, '');
        el.append(sup);
        i = m.index + m[0].length;
    }
    if (i < t.length) el.append(t.slice(i));
    return el;
}

/* ── Navegação ──────────────────────────────────────────── */
function mostrarTela(id) {
    for (const t of document.querySelectorAll('.tela')) t.classList.toggle('oculto', t.id !== id);
    const alvo = $(id);
    if (alvo) alvo.scrollTop = 0;
}

function abrirModal(id) {
    const m = $(id);
    if (!m) return;
    m.classList.add('aberto');
    if (id === 'm-relatorio') desenharRelatorio();
    const foco = m.querySelector('button, select');
    if (foco) foco.focus();
}
function fecharModal(m) { (typeof m === 'string' ? $(m) : m).classList.remove('aberto'); }
const modalAberto = () => document.querySelector('.modal.aberto');

/* ── Início ─────────────────────────────────────────────── */
function iniciarIcones() {
    document.querySelectorAll('[data-abrir="m-relatorio"]').forEach(b => b.innerHTML = ICONES.relatorio);
    document.querySelectorAll('[data-abrir="m-creditos"]').forEach(b => b.innerHTML = ICONES.info);
    $('btn-musica').innerHTML = ICONES.musica;
    $('btn-voz').innerHTML = ICONES.voz;
    $('btn-tela').innerHTML = ICONES.tela;
}

$('nome-a').value = cfg.nomeA;
$('nome-b').value = cfg.nomeB;
$('form-times').addEventListener('submit', (e) => {
    e.preventDefault();
    cfg.nomeA = $('nome-a').value.trim() || 'Turma A';
    cfg.nomeB = $('nome-b').value.trim() || 'Turma B';
    if (cfg.nomeA.toLowerCase() === cfg.nomeB.toLowerCase()) cfg.nomeB += ' (2)';
    salvarCfg();
    sfx('sfx_start');
    mostrarTela('tela-central');
    prepararCentral();
});
$('voltar-inicio').addEventListener('click', () => mostrarTela('tela-inicio'));

/* ── Central: regras e escolha do assunto ───────────────── */
function marcarSeg() {
    document.querySelectorAll('.seg[data-cfg]').forEach(seg => {
        const chave = seg.dataset.cfg;
        seg.querySelectorAll('button').forEach(b => {
            const ativo = String(cfg[chave]) === b.dataset.v;
            b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
        });
    });
}
document.querySelectorAll('.seg[data-cfg] button').forEach(b => {
    b.addEventListener('click', () => {
        const chave = b.parentElement.dataset.cfg;
        const v = b.dataset.v;
        cfg[chave] = (chave === 'meta' || chave === 'tempo') ? Number(v)
            : (chave === 'nivel' && v !== 'prog') ? Number(v) : v;
        salvarCfg();
        marcarSeg();
    });
});

document.querySelectorAll('.aba').forEach(a => {
    a.addEventListener('click', () => {
        document.querySelectorAll('.aba').forEach(x => {
            const on = x === a;
            x.classList.toggle('ativa', on);
            x.setAttribute('aria-selected', on ? 'true' : 'false');
            $('painel-' + x.dataset.aba).classList.toggle('oculto', !on);
        });
    });
});

function cartao({ nome, sub, topoEsq, topoDir, eixo, aoClicar }) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cartao' + (eixo ? ' eixo-' + EIXO_COR[eixo] : '');
    const topo = document.createElement('span'); topo.className = 'c-topo';
    const e = document.createElement('span'); e.textContent = topoEsq || '';
    const d = document.createElement('span'); d.textContent = topoDir || '';
    topo.append(e, d);
    const n = document.createElement('span'); n.className = 'c-nome';
    if (eixo) { const p = document.createElement('i'); p.className = 'c-ponto'; n.append(p); }
    n.append(nome);
    const s = document.createElement('span'); s.className = 'c-sub'; s.textContent = sub || '';
    b.append(topo, n, s);
    b.addEventListener('click', aoClicar);
    return b;
}

let manifestoCarregado = false;
async function prepararCentral() {
    marcarSeg();
    // Recomposição (banco do evento)
    const pe = $('painel-evento');
    if (!pe.childElementCount) {
        const nota = document.createElement('p');
        nota.className = 'contagem';
        nota.textContent = 'Banco do evento: 280 questões fixas do 6º e 7º anos, sem níveis de dificuldade.';
        const grade = document.createElement('div'); grade.className = 'grade-cartoes';
        for (const [n, bl] of Object.entries(BLOCOS)) {
            const total = poolDoBloco(n).length;
            grade.append(cartao({
                nome: `Bloco ${n}: ${bl.nome}`, sub: `${total} questões`,
                topoEsq: rotuloAno(bl.ano), topoDir: 'evento', eixo: 'Números',
                aoClicar: () => iniciar({
                    rotulo: `Bloco ${n}: ${bl.nome}`, nivelTxt: 'Banco do evento',
                    carregar: async () => poolDoBloco(n)
                })
            }));
        }
        pe.append(nota, grade);
    }
    if (manifestoCarregado) return;
    try {
        const lista = await carregarManifesto();
        manifestoCarregado = true;
        $('erro-central').classList.add('oculto');
        montarSeries(lista);
        montarAssuntos(lista);
    } catch (e) {
        const er = $('erro-central');
        er.textContent = 'Não consegui carregar os assuntos do MathLab. O banco do evento continua disponível. Abra o jogo por um endereço da internet (GitHub Pages) ou por um servidor local.';
        er.classList.remove('oculto');
    }
}

function montarSeries(lista) {
    const ps = $('painel-serie');
    ps.textContent = '';
    const nota = document.createElement('p');
    nota.className = 'contagem';
    nota.textContent = 'Revisão mista: sorteia questões de todos os assuntos da série, um assunto de cada vez.';
    const grade = document.createElement('div'); grade.className = 'grade-cartoes';
    for (const ano of [6, 7, 8, 9, 10, 11, 12]) {
        const assuntos = lista.filter(a => a.ano === ano);
        if (!assuntos.length) continue;
        const total = assuntos.reduce((s, a) => s + Object.values(a.n).reduce((x, y) => x + y, 0), 0);
        grade.append(cartao({
            nome: `Revisão do ${rotuloAno(ano)}`, sub: `${assuntos.length} assuntos, ${total} questões`,
            topoEsq: rotuloAno(ano), topoDir: 'mista',
            aoClicar: () => iniciar({
                rotulo: `Revisão do ${rotuloAno(ano)}`, nivelTxt: null,
                carregar: () => poolDaSerie(ano)
            })
        }));
    }
    ps.append(nota, grade);
}

const semAcento = (t) => String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const filtro = { q: '', ano: 0, eixo: '' };

function montarAssuntos(lista) {
    const chips = (alvo, itens, chave, rotulo) => {
        alvo.textContent = '';
        for (const [valor, texto] of itens) {
            const b = document.createElement('button');
            b.type = 'button'; b.textContent = texto;
            b.setAttribute('aria-pressed', String(filtro[chave] === valor));
            b.addEventListener('click', () => {
                filtro[chave] = valor;
                alvo.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', 'false'));
                b.setAttribute('aria-pressed', 'true');
                desenhar();
            });
            alvo.append(b);
        }
    };
    chips($('filtro-serie'), [[0, 'Todas as séries'], ...[6, 7, 8, 9, 10, 11, 12].map(a => [a, rotuloAno(a)])], 'ano');
    chips($('filtro-eixo'), [['', 'Todos os eixos'], ...EIXOS.map(e => [e, e])], 'eixo');
    $('busca').addEventListener('input', (e) => { filtro.q = semAcento(e.target.value); desenhar(); });

    function desenhar() {
        const grade = $('grade-assuntos');
        grade.textContent = '';
        const achados = lista.filter(a =>
            (!filtro.ano || a.ano === filtro.ano) &&
            (!filtro.eixo || a.eixo === filtro.eixo) &&
            (!filtro.q || semAcento([a.nome, a.sub, a.eixo, rotuloAno(a.ano), ...(a.bncc || [])].join(' ')).includes(filtro.q)));
        $('contagem-assuntos').textContent = `${achados.length} de ${lista.length} assuntos`;
        for (const a of achados) {
            const total = Object.values(a.n).reduce((x, y) => x + y, 0);
            grade.append(cartao({
                nome: a.nome, sub: a.sub || '', eixo: a.eixo,
                topoEsq: rotuloAno(a.ano), topoDir: `${total} questões`,
                aoClicar: () => iniciar({
                    rotulo: a.nome, nivelTxt: null, bncc: a.bncc,
                    carregar: () => poolDoAssunto(a.id)
                })
            }));
        }
    }
    desenhar();
}

/* ── Início da batalha ──────────────────────────────────── */
async function iniciar(fonte) {
    fonteAtual = fonte;
    let pool;
    try {
        $('erro-central').classList.add('oculto');
        pool = await fonte.carregar();
    } catch (e) {
        const er = $('erro-central');
        er.textContent = 'Não consegui carregar as questões. Confira a internet e tente de novo.';
        er.classList.remove('oculto');
        return;
    }
    if (!pool.length) return;
    partida = B.criarPartida(cfg, pool);
    errosDaPartida = {};
    musicaFinal = false;
    buzzer = null;
    $('chip-assunto').textContent = fonte.rotulo;
    $('chip-bncc').textContent = (fonte.bncc || []).slice(0, 2).join(' · ');
    $('chip-bncc').classList.toggle('oculto', !(fonte.bncc || []).length);
    $('btn-modo').classList.remove('oculto');
    $('btn-musica').innerHTML = audioEstado.musica ? ICONES.musica : ICONES.mudo;
    $('btn-musica').setAttribute('aria-pressed', String(audioEstado.musica));
    $('btn-voz').innerHTML = audioEstado.voz ? ICONES.voz : ICONES.vozOff;
    $('btn-voz').setAttribute('aria-pressed', String(audioEstado.voz));
    $('nome-placar-a').textContent = partida.times.A.nome;
    $('nome-placar-b').textContent = partida.times.B.nome;
    mostrarTela('tela-jogo');
    tocarMusica('bgm_base');
    sfx('sfx_transition');
    proximaRodada();
}

function rotuloModo() {
    return partida.cfg.modo === 'buzzer' ? 'Modo: buzzer (A e B)' : 'Modo: alternado';
}

/* ── Rodada ─────────────────────────────────────────────── */
function proximaRodada() {
    const q = B.sortear(partida);
    dicasUsadas = 0;
    respondeu = false;
    buzzer = null;
    escrever($('enunciado'), q.q);
    $('dicas').textContent = '';
    $('retorno').textContent = '';
    $('retorno').className = 'retorno';
    $('btn-prox').classList.add('oculto');
    $('btn-modo').textContent = rotuloModo();
    const btnDica = $('btn-dica');
    btnDica.classList.toggle('oculto', q.h.length === 0);
    btnDica.disabled = false;
    atualizarBotaoDica();

    // chip de nível
    const nv = $('chip-nivel');
    const txt = q.nivel ? `Nível ${q.nivel}` : (fonteAtual.nivelTxt || '');
    nv.textContent = txt; nv.classList.toggle('oculto', !txt);
    // chip do assunto na revisão mista
    $('chip-assunto').textContent = fonteAtual.nivelTxt ? fonteAtual.rotulo : `${fonteAtual.rotulo}${q.assunto.nome !== fonteAtual.rotulo ? ' · ' + q.assunto.nome : ''}`;
    if (!fonteAtual.bncc || !fonteAtual.bncc.length) {
        const bn = $('chip-bncc');
        bn.textContent = (q.bncc || []).slice(0, 2).join(' · ');
        bn.classList.toggle('oculto', !(q.bncc || []).length);
    }

    // alternativas
    const alts = $('alternativas');
    alts.textContent = '';
    q.o.forEach((texto, i) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'alt'; b.dataset.i = String(i);
        const n = document.createElement('span'); n.className = 'num'; n.textContent = String(i + 1);
        const t = document.createElement('span'); t.className = 'txt'; escrever(t, texto);
        b.append(n, t);
        b.addEventListener('click', () => escolher(i));
        alts.append(b);
    });

    // reta numérica (só nas contas simples do banco do evento)
    const canvas = $('reta');
    const conta = q.reta ? lerConta(q.q) : null;
    canvas.classList.toggle('oculto', !conta);
    if (conta) { canvas._conta = conta; desenharReta(canvas, conta, 0); }

    atualizarPlacar();
    atualizarFaixas();
    iniciarCronometro();
    if (audioEstado.voz) falar(`${q.q}. ${q.o.map((o, i) => `Opção ${i + 1}: ${o}`).join('. ')}`);
}

function atualizarFaixas() {
    const f = $('faixa-especial');
    let txt = '';
    if (B.ehRodadaEspecial(partida)) txt = 'Rodada especial: pontos em dobro';
    else if (B.emFaseFinal(partida)) txt = 'Desafio final: pontos +50%';
    f.textContent = txt;
    f.classList.toggle('oculto', !txt);
    $('rodada').textContent = `Rodada ${partida.rodada}`;
    $('rodada').classList.toggle('especial', B.ehRodadaEspecial(partida));
    if (B.emFaseFinal(partida) && !musicaFinal) { musicaFinal = true; tocarMusica('bgm_final'); }
}

function atualizarAvisoTurno() {
    const av = $('aviso-turno');
    av.textContent = '';
    if (respondeu) return;
    if (partida.cfg.modo === 'buzzer') {
        if (!buzzer) { av.textContent = 'Aperte A ou B no teclado para responder'; return; }
        const t = partida.times[buzzer];
        const b = document.createElement('b'); b.textContent = t.nome;
        b.style.setProperty('--c', buzzer === 'A' ? 'var(--a)' : 'var(--b)');
        av.append('Vez da turma ', b);
    } else {
        const t = partida.times[partida.turno];
        const b = document.createElement('b'); b.textContent = t.nome;
        b.style.setProperty('--c', partida.turno === 'A' ? 'var(--a)' : 'var(--b)');
        av.append('Vez da turma ', b);
    }
}

function atualizarPlacar() {
    const { A, B: TB } = partida.times;
    $('pts-a').textContent = A.pts;
    $('pts-b').textContent = TB.pts;
    $('combo-a').textContent = A.combo >= 2 ? `Combo ×${A.combo}` : '';
    $('combo-b').textContent = TB.combo >= 2 ? `Combo ×${TB.combo}` : '';
    const meta = partida.cfg.meta;
    $('meta-a').style.width = Math.min(100, 50 * A.pts / meta) + '%';
    $('meta-b').style.width = Math.min(100, 50 * TB.pts / meta) + '%';
    $('meta-txt').textContent = `Meta: ${meta} pontos`;
    const vez = partida.cfg.modo === 'buzzer' ? buzzer : partida.turno;
    $('time-a').classList.toggle('vez', !respondeu && vez === 'A');
    $('time-b').classList.toggle('vez', !respondeu && vez === 'B');
    atualizarAvisoTurno();
}

/* ── Cronômetro ─────────────────────────────────────────── */
function pararCronometro() { clearInterval(cronometro); cronometro = null; }

function iniciarCronometro() {
    pararCronometro();
    const t = $('tempo');
    const limite = partida.cfg.tempo;
    t.classList.toggle('oculto', !limite);
    if (!limite) return;
    tempoRestante = limite;
    t.classList.remove('curto');
    const desenhar = () => {
        $('tempo-barra').style.width = (100 * tempoRestante / limite) + '%';
        $('tempo-seg').textContent = Math.ceil(tempoRestante) + ' s';
        t.classList.toggle('curto', tempoRestante <= 5);
    };
    desenhar();
    let ultimoInteiro = Math.ceil(tempoRestante);
    cronometro = setInterval(() => {
        tempoRestante = Math.max(0, tempoRestante - 0.1);
        desenhar();
        const inteiro = Math.ceil(tempoRestante);
        if (inteiro !== ultimoInteiro && inteiro <= 5 && inteiro > 0) sfx('sfx_tick');
        ultimoInteiro = inteiro;
        if (tempoRestante <= 0) { pararCronometro(); tempoEsgotado(); }
    }, 100);
}

function tempoEsgotado() {
    if (respondeu) return;
    if (partida.cfg.modo === 'buzzer' && !buzzer) {
        // ninguém apertou: revela e passa a rodada, sem pontos
        respondeu = true;
        B.pularRodada(partida);
        revelar(null, { acerto: false, pts: 0, tag: null, explicacao: null, semResposta: true, ninguem: true });
        return;
    }
    finalizarResposta(-1);
}

/* ── Respostas ──────────────────────────────────────────── */
function atualizarBotaoDica() {
    const q = partida.atual;
    const b = $('btn-dica');
    const restam = q.h.length - dicasUsadas;
    b.disabled = respondeu || restam <= 0;
    b.textContent = restam > 0
        ? `Pedir ${dicasUsadas ? 'outra dica' : 'dica'} (−${B.PENALIDADE_DICA} pts)`
        : 'Sem mais dicas';
}

$('btn-dica').addEventListener('click', () => {
    if (respondeu) return;
    const q = partida.atual;
    if (dicasUsadas >= q.h.length) return;
    const p = document.createElement('p');
    p.className = 'dica';
    escrever(p, `Dica ${dicasUsadas + 1}: ${q.h[dicasUsadas]}`);
    $('dicas').append(p);
    dicasUsadas += 1;
    atualizarBotaoDica();
    sfx('sfx_point');
    if (audioEstado.voz) falar(q.h[dicasUsadas - 1]);
});

function escolher(indice) {
    if (respondeu || !partida) return;
    if (partida.cfg.modo === 'buzzer' && !buzzer) {
        $('aviso-turno').textContent = 'Primeiro, uma turma aperta A ou B no teclado';
        return;
    }
    finalizarResposta(indice);
}

function finalizarResposta(indice) {
    if (respondeu) return;
    respondeu = true;
    pararCronometro();
    const chave = partida.cfg.modo === 'buzzer' ? buzzer : partida.turno;
    const q = partida.atual;
    const r = B.responder(partida, { chave, indice, dicas: dicasUsadas });
    const time = partida.times[chave];
    R.registrar({
        turma: time.nome, assuntoId: q.assunto.id, assunto: q.assunto.nome,
        bncc: q.bncc, acerto: r.acerto, tag: r.tag, dicas: dicasUsadas
    });
    if (r.tag) errosDaPartida[r.tag] = (errosDaPartida[r.tag] || 0) + 1;
    revelar(indice, r);
}

function revelar(indice, r) {
    const q = partida.atual;
    document.querySelectorAll('.alt').forEach(b => {
        const i = Number(b.dataset.i);
        b.disabled = true;
        if (i === q.c) {
            b.classList.add('certa');
            const s = document.createElement('span'); s.className = 'selo-res'; s.textContent = '✔ certa';
            b.append(s);
        } else if (i === indice) {
            b.classList.add('errada');
            const s = document.createElement('span'); s.className = 'selo-res'; s.textContent = '✖ sua resposta';
            b.append(s);
        }
    });
    $('btn-dica').disabled = true;

    const ret = $('retorno');
    ret.textContent = '';
    const res = document.createElement('div'); res.className = 'res';
    if (r.acerto) {
        const nome = partida.times[r.chave].nome;
        res.textContent = `Certo! +${r.pts} pontos para ${nome}`;
        ret.className = 'retorno ok';
        sfx('sfx_correct');
        animar('vid-ok');
        const alvo = $(r.chave === 'A' ? 'time-a' : 'time-b');
        alvo.classList.remove('pulso'); void alvo.offsetWidth; alvo.classList.add('pulso');
    } else if (r.ninguem) {
        res.textContent = 'Ninguém apertou a tempo. Veja a resposta.';
        ret.className = 'retorno no';
        sfx('sfx_wrong');
    } else {
        res.textContent = r.semResposta ? 'O tempo acabou.' : 'Não foi dessa vez.';
        ret.className = 'retorno no';
        sfx('sfx_wrong');
        animar('vid-no');
    }
    ret.append(res);
    if (r.tag && !r.semResposta) {
        const tp = document.createElement('span'); tp.className = 'tipo'; tp.textContent = `Tipo de erro: ${r.tag}`;
        ret.append(tp);
    }
    if (r.explicacao) { const p = document.createElement('p'); escrever(p, r.explicacao); ret.append(p); }
    if (q.e) { const p = document.createElement('p'); escrever(p, `Resolução: ${q.e}`); ret.append(p); }

    const canvas = $('reta');
    if (!canvas.classList.contains('oculto') && canvas._conta) animarSalto(canvas, canvas._conta);

    atualizarPlacar();
    atualizarFaixas();
    $('aviso-turno').textContent = '';

    if (audioEstado.voz) {
        const fala = r.acerto ? `Certo. ${q.e || ''}` : `${r.semResposta ? 'O tempo acabou.' : 'Resposta errada.'} ${r.explicacao || ''} ${q.e || ''}`;
        falar(fala);
    }

    if (partida.encerrada) {
        $('btn-prox').classList.add('oculto');
        setTimeout(mostrarFim, 1800);
    } else {
        $('btn-prox').classList.remove('oculto');
        $('btn-prox').focus({ preventScroll: true });
    }
}

$('btn-prox').addEventListener('click', () => { if (partida && !partida.encerrada) proximaRodada(); });

$('btn-modo').addEventListener('click', () => {
    partida.cfg.modo = partida.cfg.modo === 'buzzer' ? 'alternado' : 'buzzer';
    cfg.modo = partida.cfg.modo;
    salvarCfg();
    buzzer = null;
    $('btn-modo').textContent = rotuloModo();
    atualizarPlacar();
});

/* ── Avatar ─────────────────────────────────────────────── */
function animar(idVideo) {
    const img = $('av-img');
    const v = $(idVideo);
    if (!v) return;
    try {
        $('vid-ok').classList.add('oculto'); $('vid-no').classList.add('oculto');
        img.classList.add('oculto');
        v.classList.remove('oculto');
        v.currentTime = 0;
        v.play().catch(() => { v.classList.add('oculto'); img.classList.remove('oculto'); });
        v.onended = () => { v.classList.add('oculto'); img.classList.remove('oculto'); };
    } catch (e) { img.classList.remove('oculto'); }
}

/* ── Fim da batalha ─────────────────────────────────────── */
function mostrarFim() {
    const v = B.vencedor(partida);
    const { A, B: TB } = partida.times;
    $('fim-vencedor').textContent = v ? `${partida.times[v].nome} venceu a batalha!` : 'Empate!';
    const pl = $('fim-placar');
    pl.textContent = '';
    for (const [chave, t] of [['A', A], ['B', TB]]) {
        const s = document.createElement('span');
        const marca = document.createElement('i');
        marca.className = 'marca marca-' + chave.toLowerCase();
        s.append(marca, ` ${t.nome}: ${t.pts} pts`);
        pl.append(s);
    }
    const er = $('fim-erros');
    er.textContent = '';
    const top = R.maisComuns(errosDaPartida, 3);
    if (top.length) {
        const t = document.createElement('strong'); t.textContent = 'Erros mais comuns nesta batalha';
        const ul = document.createElement('ul');
        for (const [nome, n] of top) { const li = document.createElement('li'); li.textContent = `${nome} (${n})`; ul.append(li); }
        er.append(t, ul);
    }
    sfx('sfx_victory');
    fogos();
    abrirModal('m-fim');
}

function fogos() {
    const f = $('fogos');
    f.textContent = '';
    const cores = ['#f2b01e', '#3ad6ff', '#ff7ab6', '#35e08f', '#ffd36a'];
    for (let i = 0; i < 46; i++) {
        const p = document.createElement('i');
        p.style.left = (Math.random() * 100) + '%';
        p.style.background = cores[i % cores.length];
        p.style.setProperty('--dx', (Math.random() * 240 - 120) + 'px');
        p.style.animationDelay = (Math.random() * 0.6) + 's';
        f.append(p);
    }
    f.classList.remove('oculto');
    setTimeout(() => f.classList.add('oculto'), 3400);
}

$('fim-de-novo').addEventListener('click', () => { fecharModal('m-fim'); iniciar(fonteAtual); });
$('fim-menu').addEventListener('click', () => { fecharModal('m-fim'); voltarAoMenu(); });

function voltarAoMenu() {
    pararCronometro();
    pararMusica();
    calarVoz();
    partida = null;
    mostrarTela('tela-central');
    prepararCentral();
}
$('sair-jogo').addEventListener('click', voltarAoMenu);

/* ── Relatório ──────────────────────────────────────────── */
function desenharRelatorio() {
    const sel = $('rel-turma');
    const turmas = R.turmas();
    const atual = sel.value;
    sel.textContent = '';
    const todas = document.createElement('option'); todas.value = ''; todas.textContent = 'Todas as turmas';
    sel.append(todas);
    for (const t of turmas) { const o = document.createElement('option'); o.value = t; o.textContent = t; sel.append(o); }
    sel.value = turmas.includes(atual) ? atual : '';
    const alvo = $('rel-conteudo');
    alvo.textContent = '';
    const lista = R.resumo(sel.value);
    if (!lista.length) {
        const p = document.createElement('p'); p.className = 'vazio';
        p.textContent = 'Ainda não há respostas registradas. Jogue uma batalha para ver o relatório.';
        alvo.append(p);
        return;
    }
    for (const a of lista) {
        const f = R.faixa(a.pct);
        const it = document.createElement('div'); it.className = 'rel-item';
        const topo = document.createElement('div'); topo.className = 'rel-topo';
        const nome = document.createElement('b'); nome.textContent = a.assunto;
        const dir = document.createElement('span');
        const fx = document.createElement('span'); fx.className = 'faixa ' + f.id; fx.textContent = `${f.simbolo} ${f.texto}`;
        dir.append(`${a.pct}% de acerto (${a.acertos} de ${a.respostas}) `, fx);
        topo.append(nome, dir);
        const barra = document.createElement('div'); barra.className = 'rel-barra';
        const preen = document.createElement('i'); preen.style.width = a.pct + '%'; barra.append(preen);
        it.append(topo, barra);
        const top = R.maisComuns(a.erros, 3);
        if (top.length) {
            const e = document.createElement('div'); e.className = 'rel-erros';
            e.textContent = 'Erros mais comuns: ' + top.map(([t, n]) => `${t} (${n})`).join(', ');
            it.append(e);
        }
        alvo.append(it);
    }
}
$('rel-turma').addEventListener('change', desenharRelatorio);
$('rel-csv').addEventListener('click', () => {
    const blob = new Blob([R.csv()], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Batalha_Matematica_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
});
$('rel-zerar').addEventListener('click', () => {
    if (confirm('Apagar todo o relatório guardado neste navegador? Isso não pode ser desfeito.')) {
        R.zerar();
        desenharRelatorio();
    }
});

/* ── Modais, ícones e atalhos ───────────────────────────── */
document.addEventListener('click', (e) => {
    const ab = e.target.closest('[data-abrir]');
    if (ab) { abrirModal(ab.dataset.abrir); return; }
    if (e.target.closest('[data-fechar]')) { fecharModal(e.target.closest('.modal')); return; }
    if (e.target.classList && e.target.classList.contains('modal') && e.target.id !== 'm-fim') fecharModal(e.target);
});

$('btn-musica').addEventListener('click', () => {
    const on = alternarMusica();
    $('btn-musica').innerHTML = on ? ICONES.musica : ICONES.mudo;
    $('btn-musica').setAttribute('aria-pressed', String(on));
});
$('btn-voz').addEventListener('click', () => {
    const on = alternarVoz();
    $('btn-voz').innerHTML = on ? ICONES.voz : ICONES.vozOff;
    $('btn-voz').setAttribute('aria-pressed', String(on));
});
$('btn-tela').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
});

document.addEventListener('keydown', (e) => {
    if (e.target.matches && e.target.matches('input, select, textarea')) return;
    if (e.key === 'Escape') { const m = modalAberto(); if (m && m.id !== 'm-fim') fecharModal(m); return; }
    if (modalAberto() || !partida || $('tela-jogo').classList.contains('oculto')) return;
    const k = e.key.toLowerCase();
    if (partida.cfg.modo === 'buzzer' && !respondeu && !buzzer && (k === 'a' || k === 'b')) {
        buzzer = k.toUpperCase();
        sfx('sfx_tick');
        atualizarPlacar();
        return;
    }
    if (!respondeu && k >= '1' && k <= '4') {
        const i = Number(k) - 1;
        if (i < partida.atual.o.length) escolher(i);
        return;
    }
    if (respondeu && !partida.encerrada && (e.key === 'Enter' || e.key === 'ArrowRight')) {
        if (document.activeElement && document.activeElement.id === 'btn-prox') return; // o próprio botão trata
        e.preventDefault();
        proximaRodada();
    }
});

iniciarIcones();
marcarSeg();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}
