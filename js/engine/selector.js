/**
 * js/engine/selector.js
 * Motor de Seleção Inteligente - Versão 5.0 (Multiblocos)
 * Responsável por filtrar e sortear questões sem repetição imediata.
 */

import { G } from './gameState.js';
import { pool } from '../data/questions/index.js';

// Memória de sessão: guarda os IDs das perguntas já respondidas para evitar repetição
let perguntasFeitas = [];

/**
 * Seleciona uma questão baseada no bloco ativo
 * @param {number} blockId - O ID do bloco selecionado (1 a 5)
 * @returns {object} - O objeto da questão sorteada
 */
export function selQ(blockId) {
    // 1. Filtra o banco de dados pelo Bloco Ativo
    // Nota: Certifique-se de que no seu banco de dados (trilha1.js, etc), 
    // as questões tenham a propriedade "bloco: 1"
    let disponiveis = pool.filter(q => q.bloco === blockId);

    // 2. Trava de Segurança: Se não houver questões no bloco, tenta o Bloco 1 (Base)
    if (disponiveis.length === 0) {
        console.warn(`Aviso: Bloco ${blockId} está vazio ou não foi encontrado.`);
        disponiveis = pool.filter(q => q.bloco === 1);
    }

    // 3. Caso crítico: Banco de dados totalmente vazio ou inacessível
    if (disponiveis.length === 0) {
        return {
            id: "PLACEHOLDER",
            bloco: blockId,
            tipo: "aritmetica",
            display: "Laboratório em Manutenção! 🚧",
            botoes: ["Entendido", "Aguardar"],
            res: "Entendido",
            passo: "O sistema está carregando novos desafios.",
            dica: "Ada está processando os dados do Bloco " + blockId
        };
    }

    // 4. Filtra apenas as perguntas que ainda NÃO foram feitas nesta sessão
    let naoFeitas = disponiveis.filter(q => !perguntasFeitas.includes(q.id));

    // 5. Reinício de Ciclo (Lógica DUA): 
    // Se o aluno esgotou o banco daquele bloco, limpamos o histórico DESTE BLOCO
    // para que ele possa revisar as questões (recomposição por repetição).
    if (naoFeitas.length === 0) {
        console.log(`%c Ciclo do Bloco ${blockId} completo! Reiniciando embaralhamento...`, "color: #00cec9");
        
        // Remove do histórico global apenas as perguntas que pertencem a este bloco
        const idsDesteBloco = disponiveis.map(q => q.id);
        perguntasFeitas = perguntasFeitas.filter(id => !idsDesteBloco.includes(id));
        
        naoFeitas = disponiveis; 
    }

    // 6. Sorteio Aleatório dentro das opções restantes
    const indiceAleatorio = Math.floor(Math.random() * naoFeitas.length);
    const qSorteada = naoFeitas[indiceAleatorio];
    
    // 7. Registra no histórico para evitar repetição na próxima chamada
    perguntasFeitas.push(qSorteada.id);

    // Debug pedagógico no console
    console.log(`[LabTech] Bloco: ${blockId} | Questão: ${qSorteada.id} | Restantes: ${naoFeitas.length - 1}`);

    return qSorteada;
}

/**
 * Função para limpar todo o histórico (útil ao trocar de aluno ou reiniciar o lab)
 */
export function limparHistoricoSessao() {
    perguntasFeitas = [];
    console.log("Histórico de questões zerado.");
}
