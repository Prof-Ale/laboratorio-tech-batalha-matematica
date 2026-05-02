/**
 * js/engine/gameState.js
 * Estado global do jogo - Laboratório Tech v6.0
 */

export const G = {
    // Progresso do jogo
    combo: 0,
    nivel: 1,
    acertos: 0,
    erros: 0,
    // Controle de tela
    blocoAtivo: 1,
    questaoAtual: null,
    respondeu: false,
    // Preferências
    musica: true,
    voz: true,
    // Identificação
    nome: "Cientista",
    // Diagnóstico BNCC (alimentado a cada resposta)
    historico: {}
};

export function salvarProgresso() {
    try {
        localStorage.setItem('labtech_v6', JSON.stringify({
            historico: G.historico,
            nome: G.nome
        }));
    } catch (e) { /* modo privado: segue sem persistência */ }
}

export function carregarProgresso() {
    try {
        const raw = localStorage.getItem('labtech_v6');
        if (!raw) return;
        const dados = JSON.parse(raw);
        if (dados.historico) G.historico = dados.historico;
        if (dados.nome) G.nome = dados.nome;
    } catch (e) {}
}
