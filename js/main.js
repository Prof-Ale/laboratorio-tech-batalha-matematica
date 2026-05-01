import { G, salvarProgresso } from './engine/gameState.js';
import { selQ } from './engine/selector.js';
import { renderHUD, falarDica, mostrarModal, atualizarAvatar } from './ui-manager.js';

// Variaveis da Batalha v6.0
let scoreA = 0, scoreB = 0;
let turnoAtual = 'A';
let rodada = 1;
let inicioQuestaoMs = 0;

/**
 * EXPOSIÇÃO GLOBAL: Garante que os botões do HTML funcionem
 */
window.mostrarSeletorBlocos = () => {
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('block-selector').classList.remove('hidden');
};

window.iniciarBloco = (blocoId) => {
    G.blocoAtivo = blocoId;
    G.perguntasFeitas = []; // Limpa histórico do bloco para evitar travar se o pool for pequeno
    document.getElementById('block-selector').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Reset de batalha
    scoreA = 0; scoreB = 0; rodada = 1;
    proximaQ();
};

window.proximaQ = () => {
    const q = selQ(G.blocoAtivo);
    if (!q) {
        alert("Erro ao carregar questão. Verifique os arquivos de trilha.");
        return;
    }
    
    G.questaoAtual = q;
    G.respondeu = false;
    inicioQuestaoMs = Date.now();
    
    atualizarInterface(q);
};

/**
 * LÓGICA DE VERIFICAÇÃO E PONTUAÇÃO
 */
window.verificarResposta = (escolha) => {
    if (G.respondeu) return;
    G.respondeu = true;

    const q = G.questaoAtual;
    const acertou = escolha === q.res;
    const tempoResposta = (Date.now() - inicioQuestaoMs) / 1000;

    if (acertou) {
        const pts = calcularPontos(tempoResposta);
        if (turnoAtual === 'A') scoreA += pts; else scoreB += pts;
        
        G.acertos++;
        G.combo++;
        atualizarAvatar('ok');
    } else {
        G.erros++;
        G.combo = 0;
        atualizarAvatar('no');
        // No erro, o turno sempre passa
    }

    // Lógica de Alternância
    turnoAtual = (turnoAtual === 'A') ? 'B' : 'A';
    rodada++;
    
    renderHUD(acertou, q.passo); // ui-manager cuida do feedback visual
    atualizarPlacarVisual();
    
    if (scoreA >= 100 || scoreB >= 100) {
        finalizarBatalha();
    }
};

function calcularPontos(tempo) {
    let pts = 10;
    if (G.combo >= 2) pts += 5;
    if (tempo <= 7) pts += 5; // Bônus relâmpago
    if (rodada % 5 === 0) pts *= 2; // Rodada Especial
    return pts;
}

function atualizarPlacarVisual() {
    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;
    document.getElementById('tcb').innerText = G.combo;
    
    // Destaque visual de quem é a vez (DUA)
    document.querySelector('.team-a').classList.toggle('ativo', turnoAtual === 'A');
    document.querySelector('.team-b').classList.toggle('ativo', turnoAtual === 'B');
}

window.abrirM = (id) => mostrarModal(id, true);
window.fecharM = (id) => mostrarModal(id, false);

// Inicialização de áudio ao primeiro clique para cumprir política do navegador
document.addEventListener('click', () => {
    const bgm = document.getElementById('bgm');
    if (G.musica && bgm.paused) bgm.play().catch(() => {});
}, { once: true });
