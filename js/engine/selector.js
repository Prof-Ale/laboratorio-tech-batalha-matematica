/**
 * js/engine/selector.js
 * Motor de Seleção Inteligente - Versão 5.1 (resiliente)
 */

import { pool } from '../data/questions/index.js';

let perguntasFeitas = [];

const diagnosticoSeletor = {
    blocoSolicitado: 1,
    blocoUsado: 1,
    fallbackGlobal: false,
    poolTotal: 0,
    disponiveisBloco: 0,
    disponiveisUsadas: 0
};

function placeholder(blockId) {
    return {
        id: `PLACEHOLDER_${blockId}`,
        bloco: Number(blockId) || 1,
        tipo: 'aritmetica',
        display: 'Laboratório em manutenção rápida! 🚧',
        botoes: ['Entendido', 'Aguardar'],
        res: 'Entendido',
        passo: 'O sistema está carregando novos desafios.',
        dica: `Ada está processando os dados do Bloco ${blockId || 1}`
    };
}

export function selQ(blockId) {
    const blocoNormalizado = Number(blockId) || 1;
    const baseGlobal = Array.isArray(pool) ? pool : [];

    diagnosticoSeletor.blocoSolicitado = blocoNormalizado;
    diagnosticoSeletor.poolTotal = baseGlobal.length;
    diagnosticoSeletor.fallbackGlobal = false;

    if (baseGlobal.length === 0) {
        console.warn('Pool de questões vazio.');
        return placeholder(blocoNormalizado);
    }

    const disponiveisDoBloco = baseGlobal.filter(q => Number(q.bloco) === blocoNormalizado);
    diagnosticoSeletor.disponiveisBloco = disponiveisDoBloco.length;

    let disponiveis = disponiveisDoBloco;

    // fallback resiliente: se bloco estiver sem questões, usa base inteira
    if (disponiveis.length === 0) {
        console.warn(`Bloco ${blocoNormalizado} sem questões. Usando base global.`);
        disponiveis = baseGlobal;
        diagnosticoSeletor.fallbackGlobal = true;
    }

    let naoFeitas = disponiveis.filter(q => q && q.id && !perguntasFeitas.includes(q.id));

    if (naoFeitas.length === 0) {
        const idsDisponiveis = disponiveis.map(q => q.id).filter(Boolean);
        perguntasFeitas = perguntasFeitas.filter(id => !idsDisponiveis.includes(id));
        naoFeitas = disponiveis;
    }

    const indiceAleatorio = Math.floor(Math.random() * naoFeitas.length);
    const qSorteada = naoFeitas[indiceAleatorio];

    if (!qSorteada) return placeholder(blocoNormalizado);

    if (qSorteada.id) perguntasFeitas.push(qSorteada.id);

    diagnosticoSeletor.blocoUsado = Number(qSorteada.bloco) || blocoNormalizado;
    diagnosticoSeletor.disponiveisUsadas = disponiveis.length;

    console.log(`[LabTech] Bloco: ${blocoNormalizado} | Questão: ${qSorteada.id || 'SEM_ID'} | Restantes: ${naoFeitas.length - 1}`);

    return qSorteada;
}

export function limparHistoricoSessao() {
    perguntasFeitas = [];
    console.log('Histórico de questões zerado.');
}


export function getSelectorDiag() {
    return { ...diagnosticoSeletor };
}
