/**
 * js/banco.js
 * Fontes de questões da Batalha.
 *  1) Banco do evento (blocos 1 a 5, em js/data/questions): 280 questões fixas do 6º e 7º anos.
 *  2) Banco do MathLab (data/banco): 96 assuntos do 6º ano ao 3º ano do Ensino Médio.
 * As duas fontes são convertidas para o mesmo formato:
 *   { id, q, o[], c, tg[], ms[], h[], e, bncc[], assunto:{id,nome}, nivel }
 */
import { pool as legado } from './data/questions/index.js';

export const BLOCOS = {
    1: { nome: 'Inteiros: soma e subtração', ano: 7 },
    2: { nome: 'Múltiplos e divisores', ano: 7 },
    3: { nome: 'Inteiros: multiplicação e divisão', ano: 7 },
    4: { nome: 'Frações, decimais e porcentagem', ano: 6 },
    5: { nome: 'MMC e MDC', ano: 6 }
};

export const EIXOS = ['Números', 'Álgebra', 'Geometria', 'Grandezas e Medidas', 'Probabilidade e Estatística'];
export const EIXO_COR = {
    'Números': 'num', 'Álgebra': 'alg', 'Geometria': 'geo',
    'Grandezas e Medidas': 'med', 'Probabilidade e Estatística': 'est'
};

export function rotuloAno(ano) {
    return ano >= 10 ? `${ano - 9}ª série EM` : `${ano}º ano`;
}

/** Troca o hífen por sinal de menos verdadeiro (−) em contas e números negativos. */
export function menos(texto) {
    return String(texto == null ? '' : texto)
        .replace(/(^|[\s(=×÷+*/])-(?=[\d(])/g, '$1−')
        .replace(/\s-\s/g, ' − ')
        .replace(/(\d)-(?=\(?\d+\)?\s*=)/g, '$1 − ')
        .replace(/(^|[\s(])[−-]0(?![\d,.])/g, '$10');   // −0 não existe: é 0   // 12-18=−6 vira 12 − 18=−6
}

/** Descobre o tipo de erro de uma alternativa errada. */
export function tipoDeErro(questao, indice) {
    const tag = questao.tg && questao.tg[indice];
    if (tag) return tag;
    const certa = Number(String(questao.o[questao.c]).replace('−', '-').replace(',', '.'));
    const marcada = Number(String(questao.o[indice]).replace('−', '-').replace(',', '.'));
    if (Number.isFinite(certa) && Number.isFinite(marcada) && certa !== 0 && marcada === -certa) {
        return 'errou o sinal';
    }
    return 'erro de cálculo';
}

function normalizarLegado(q) {
    const botoes = q.botoes.map(menos);
    const res = menos(Array.isArray(q.res) ? q.res[0] : q.res);
    const c = botoes.findIndex(b => b === res);
    const bloco = BLOCOS[q.bloco] || BLOCOS[1];
    return {
        id: q.id,
        q: menos(q.display),
        o: botoes,
        c,
        tg: [],
        ms: [],
        h: q.dica ? [menos(q.dica)] : [],
        e: menos(q.passo || ''),
        bncc: q.bncc ? [q.bncc] : [],
        bnccDesc: q.bncc_desc || '',
        assunto: { id: 'bloco' + q.bloco, nome: bloco.nome },
        nivel: 0,
        reta: q.tipo === 'reta'
    };
}

export function poolDoBloco(numero) {
    return legado
        .filter(q => Number(q.bloco) === Number(numero))
        .map(normalizarLegado)
        .filter(q => q.c >= 0);
}

/* ── Banco do MathLab (carregado sob demanda) ───────────── */
let manifesto = null;
const cacheAssuntos = new Map();

export async function carregarManifesto() {
    if (manifesto) return manifesto;
    const r = await fetch('data/banco/manifesto.json');
    if (!r.ok) throw new Error('Não foi possível carregar a lista de assuntos.');
    manifesto = (await r.json()).assuntos;
    return manifesto;
}

async function carregarAssunto(id) {
    if (cacheAssuntos.has(id)) return cacheAssuntos.get(id);
    const r = await fetch(`data/banco/${id}.json`);
    if (!r.ok) throw new Error('Não foi possível carregar o assunto ' + id);
    const dados = await r.json();
    cacheAssuntos.set(id, dados);
    return dados;
}

function converterAssunto(d) {
    const saida = [];
    for (const [nivel, lista] of Object.entries(d.niveis)) {
        lista.forEach((x, i) => saida.push({
            id: `${d.id}:${nivel}:${i}`,
            q: x.q, o: x.o, c: x.c, tg: x.tg, ms: x.ms, h: x.h, e: x.e,
            bncc: d.bncc || [],
            bnccDesc: d.sub || '',
            assunto: { id: d.id, nome: d.nome, eixo: d.eixo, ano: d.ano },
            nivel: Number(nivel),
            reta: false
        }));
    }
    return saida;
}

export async function poolDoAssunto(id) {
    return converterAssunto(await carregarAssunto(id));
}

export async function poolDaSerie(ano) {
    const anos = [].concat(ano);
    const lista = (await carregarManifesto()).filter(a => anos.includes(a.ano));
    const todos = await Promise.all(lista.map(a => carregarAssunto(a.id)));
    return todos.flatMap(converterAssunto);
}
