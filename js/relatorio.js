/**
 * js/relatorio.js
 * Relatório acumulado por turma e por assunto. Fica só neste navegador (localStorage).
 * Não guarda nome de aluno: só o nome da turma digitado no início.
 */

const CHAVE = 'labtech_v7_relatorio';

function ler() {
    try {
        const bruto = localStorage.getItem(CHAVE);
        return bruto ? JSON.parse(bruto) : { itens: {} };
    } catch (e) { return { itens: {} }; }
}

function gravar(dados) {
    try { localStorage.setItem(CHAVE, JSON.stringify(dados)); } catch (e) { /* modo privado */ }
}

/** Soma uma resposta ao relatório. */
export function registrar({ turma, assuntoId, assunto, bncc, acerto, tag, dicas }) {
    const dados = ler();
    const k = `${turma}||${assuntoId}`;
    const it = dados.itens[k] || {
        turma, assuntoId, assunto, bncc: bncc || [],
        respostas: 0, acertos: 0, dicas: 0, erros: {}
    };
    it.respostas += 1;
    if (acerto) it.acertos += 1;
    it.dicas += dicas || 0;
    if (!acerto && tag) it.erros[tag] = (it.erros[tag] || 0) + 1;
    dados.itens[k] = it;
    gravar(dados);
}

export function todos() {
    return Object.values(ler().itens);
}

export function zerar() {
    try { localStorage.removeItem(CHAVE); } catch (e) {}
}

export function faixa(pct) {
    if (pct >= 75) return { id: 'bem', simbolo: '✔', texto: 'Bem' };
    if (pct >= 50) return { id: 'atencao', simbolo: '▲', texto: 'Atenção' };
    return { id: 'retomar', simbolo: '■', texto: 'Retomar' };
}

export function maisComuns(erros, n = 3) {
    return Object.entries(erros).sort((a, b) => b[1] - a[1]).slice(0, n);
}

export function turmas() {
    return [...new Set(todos().map(i => i.turma))].sort();
}

export function resumo(turma) {
    const lista = todos().filter(i => !turma || i.turma === turma);
    const porAssunto = new Map();
    for (const i of lista) {
        const a = porAssunto.get(i.assuntoId) || {
            assuntoId: i.assuntoId, assunto: i.assunto, bncc: i.bncc,
            respostas: 0, acertos: 0, erros: {}
        };
        a.respostas += i.respostas;
        a.acertos += i.acertos;
        for (const [t, n] of Object.entries(i.erros)) a.erros[t] = (a.erros[t] || 0) + n;
        porAssunto.set(i.assuntoId, a);
    }
    return [...porAssunto.values()]
        .map(a => ({ ...a, pct: a.respostas ? Math.round(100 * a.acertos / a.respostas) : 0 }))
        .sort((a, b) => a.pct - b.pct);
}

export function csv() {
    const cab = ['Turma', 'Assunto', 'BNCC', 'Respostas', 'Acertos', 'Percentual', 'Faixa', 'Erros mais comuns'];
    const linhas = [cab.join(';')];
    for (const i of todos().sort((a, b) => a.turma.localeCompare(b.turma) || a.assunto.localeCompare(b.assunto))) {
        const pct = i.respostas ? Math.round(100 * i.acertos / i.respostas) : 0;
        const erros = maisComuns(i.erros, 3).map(([t, n]) => `${t} (${n})`).join(' | ');
        const campos = [i.turma, i.assunto, (i.bncc || []).join(' '), i.respostas, i.acertos, pct + '%', faixa(pct).texto, erros];
        linhas.push(campos.map(c => `"${String(c).replace(/"/g, '""')}"`).join(';'));
    }
    return '﻿' + linhas.join('\n');
}
