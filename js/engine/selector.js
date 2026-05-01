/**
 * js/engine/selector.js
 * Motor de Seleção Inteligente - Versão 6.0 (Resiliência Total)
 * Foco: Não-repetição absoluta e integração de 5 blocos.
 */

import { pool } from '../data/questions/index.js';

// Memória de sessão: persiste enquanto o navegador estiver aberto
let perguntasFeitas = [];

/**
 * Filtra e sorteia uma questão de forma inteligente
 * @param {number|string} blockId - O ID do bloco selecionado (1 a 5)
 */
export function selQ(blockId) {
    const blocoAlvo = Number(blockId) || 1;
    const baseGlobal = Array.isArray(pool) ? pool : [];

    if (baseGlobal.length === 0) {
        console.error('[LabTech] Erro Crítico: O Pool de questões está vazio!');
        return gerarPlaceholder(blocoAlvo);
    }

    // 1. Filtrar questões específicas do bloco solicitado
    let poolDoBloco = baseGlobal.filter(q => Number(q.bloco) === blocoAlvo);

    // 2. Fallback: Se o bloco estiver vazio (erro de carga), busca no pool global
    if (poolDoBloco.length === 0) {
        console.warn(`[LabTech] Bloco ${blocoAlvo} sem questões. Usando pool global para evitar travamento.`);
        poolDoBloco = baseGlobal;
    }

    // 3. Filtrar questões que ainda não foram feitas nesta sessão
    let disponiveis = poolDoBloco.filter(q => !perguntasFeitas.includes(q.id));

    // 4. Se TODAS as questões do bloco já foram feitas, resetamos o histórico APENAS desse bloco
    if (disponiveis.length === 0) {
        console.log(`[LabTech] Bloco ${blocoAlvo} esgotado. Reiniciando ciclo de questões deste setor.`);
        const idsDoBloco = poolDoBloco.map(q => q.id);
        perguntasFeitas = perguntasFeitas.filter(id => !idsDoBloco.includes(id));
        disponiveis = poolDoBloco;
    }

    // 5. Sorteio aleatório dentro das disponíveis
    const sorteio = Math.floor(Math.random() * disponiveis.length);
    const qSorteada = disponiveis[sorteio];

    // 6. Registrar no histórico para evitar repetição imediata
    if (qSorteada && qSorteada.id) {
        perguntasFeitas.push(qSorteada.id);
    }

    console.log(`[LabTech] Bloco: ${blocoAlvo} | ID: ${qSorteada.id} | Pool Restante: ${disponiveis.length - 1}`);
    
    return qSorteada;
}

/**
 * Reseta o histórico (Útil para o botão "Nova Partida")
 */
export function limparHistoricoSessao() {
    perguntasFeitas = [];
    console.log('[LabTech] Memória de questões limpa.');
}

/**
 * Garante que o jogo não pare se houver falha no banco de dados
 */
function gerarPlaceholder(bloco) {
    return {
        id: `ERR_${Date.now()}`,
        bloco: bloco,
        tipo: 'aritmetica',
        display: 'ERRO DE CARGA: Verifique o Banco de Dados! ⚠️',
        botoes: ['Reiniciar', 'Menu'],
        res: 'Reiniciar',
        passo: 'Ocorreu um erro ao importar as trilhas de questões.',
        dica: 'Ada sugere verificar o arquivo data/questions/index.js'
    };
}
