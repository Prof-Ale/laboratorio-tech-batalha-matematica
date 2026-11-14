/**
 * js/batalha.js
 * Regras da batalha, sem nenhuma dependência de tela (por isso dá para testar no Node).
 */
import { tipoDeErro } from './banco.js';

export const PADRAO = {
    nomeA: '7ºA',
    nomeB: '7ºB',
    meta: 250,
    modo: 'alternado',   // 'alternado' ou 'buzzer'
    tempo: 0,            // segundos por questão, 0 = sem limite
    nivel: 'prog'        // 'prog' (progressivo) ou 1, 2, 3
};

export const PONTOS_BASE = 10;
export const BONUS_COMBO = 5;
export const BONUS_COMBO_MAX = 15;
export const PENALIDADE_DICA = 3;
export const PONTOS_MIN = 4;
export const FRACAO_FINAL = 0.72;   // a partir daqui vale +50% (desafio final)
export const RODADA_ESPECIAL = 5;   // a cada 5 rodadas, pontos em dobro

function novoTime(nome) {
    return { nome, pts: 0, combo: 0, acertos: 0, erros: 0 };
}

export function criarPartida(cfg, pool, aleatorio = Math.random) {
    return {
        cfg: { ...PADRAO, ...cfg },
        pool,
        aleatorio,
        times: { A: novoTime(cfg.nomeA || PADRAO.nomeA), B: novoTime(cfg.nomeB || PADRAO.nomeB) },
        turno: 'A',
        rodada: 1,
        usadas: new Set(),
        atual: null,
        encerrada: false
    };
}

export function outro(t) { return t === 'A' ? 'B' : 'A'; }

/** Nível de dificuldade da rodada: sobe conforme a melhor turma se aproxima da meta. */
export function nivelDaRodada(p) {
    const n = p.cfg.nivel;
    if (n === 1 || n === 2 || n === 3) return n;
    const lider = Math.max(p.times.A.pts, p.times.B.pts) / p.cfg.meta;
    if (lider < 0.34) return 1;
    if (lider < 0.68) return 2;
    return 3;
}

/** Sorteia a próxima questão: primeiro o assunto, depois a questão, sem repetir até esgotar. */
export function sortear(p) {
    const nivel = nivelDaRodada(p);
    const livres = (lista) => lista.filter(q => !p.usadas.has(q.id));
    let candidatas = livres(p.pool);
    if (candidatas.length === 0) {           // esgotou: recomeça sem repetir a última
        const ultimo = p.atual ? p.atual.id : null;
        p.usadas.clear();
        if (ultimo) p.usadas.add(ultimo);
        candidatas = livres(p.pool);
    }
    const doNivel = candidatas.filter(q => q.nivel === 0 || q.nivel === nivel);
    const base = doNivel.length ? doNivel : candidatas;
    const assuntos = [...new Set(base.map(q => q.assunto.id))];
    const escolhido = assuntos[Math.floor(p.aleatorio() * assuntos.length)];
    const doAssunto = base.filter(q => q.assunto.id === escolhido);
    const sorteada = doAssunto[Math.floor(p.aleatorio() * doAssunto.length)];
    p.usadas.add(sorteada.id);
    p.atual = embaralhar(sorteada, p.aleatorio);
    return p.atual;
}

/** Alternativas que dependem da posição (ex.: "todas as anteriores") não são embaralhadas. */
const POSICIONAL = /nenhuma|todas as|ambas|as duas|anterior/i;

/** Devolve uma cópia da questão com as alternativas em outra ordem (e c, tg e ms acompanhando). */
export function embaralhar(q, aleatorio = Math.random) {
    const n = q.o.length;
    const ordem = [...Array(n).keys()];
    if (!q.o.some(t => POSICIONAL.test(t))) {
        for (let i = n - 1; i > 0; i--) {
            const j = Math.floor(aleatorio() * (i + 1));
            [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
        }
    }
    return {
        ...q,
        o: ordem.map(i => q.o[i]),
        tg: ordem.map(i => (q.tg && q.tg[i]) || null),
        ms: ordem.map(i => (q.ms && q.ms[i]) || null),
        c: ordem.indexOf(q.c)
    };
}

export function ehRodadaEspecial(p) {
    return p.rodada % RODADA_ESPECIAL === 0;
}

export function emFaseFinal(p) {
    const lider = Math.max(p.times.A.pts, p.times.B.pts);
    return lider >= p.cfg.meta * FRACAO_FINAL;
}

export function calcularPontos(p, chave, dicas = 0) {
    const t = p.times[chave];
    const combo = Math.min((t.combo + 1) * BONUS_COMBO, BONUS_COMBO_MAX);
    const bruto = PONTOS_BASE + combo - PENALIDADE_DICA * dicas;
    const especial = ehRodadaEspecial(p) ? 2 : 1;
    const final = emFaseFinal(p) ? 1.5 : 1;
    return Math.max(PONTOS_MIN, Math.round(bruto * especial * final));
}

/**
 * Registra uma resposta.
 * indice = alternativa marcada (ou -1 se o tempo acabou).
 * chave  = 'A' ou 'B' (turma que respondeu).
 */
export function responder(p, { chave, indice, dicas = 0 }) {
    const q = p.atual;
    const semResposta = indice < 0;
    const acerto = !semResposta && indice === q.c;
    const t = p.times[chave];
    let pts = 0;
    let tag = null;
    if (acerto) {
        pts = calcularPontos(p, chave, dicas);
        t.pts += pts;
        t.combo += 1;
        t.acertos += 1;
        if (p.cfg.modo === 'alternado') p.turno = outro(chave);
    } else {
        t.combo = 0;
        t.erros += 1;
        tag = semResposta ? 'tempo esgotado' : tipoDeErro(q, indice);
        if (p.cfg.modo === 'alternado') p.turno = outro(chave);
    }
    const explicacao = semResposta ? null : (q.ms && q.ms[indice]) || null;
    p.rodada += 1;
    p.encerrada = p.times.A.pts >= p.cfg.meta || p.times.B.pts >= p.cfg.meta;
    return { acerto, pts, tag, explicacao, semResposta, chave, dicas };
}

/** Rodada em que ninguém apertou o buzzer a tempo: só passa para a próxima. */
export function pularRodada(p) {
    p.rodada += 1;
}

export function vencedor(p) {
    const { A, B } = p.times;
    if (A.pts === B.pts) return null;
    return A.pts > B.pts ? 'A' : 'B';
}
