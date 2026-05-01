/**
 * js/main.js - Orquestrador Geral v6.0
 * Batalha Matemática: 7ºA vs 7ºB (Edição Dia da Matemática 2026)
 */

import { G, salvarProgresso } from './engine/gameState.js';
import { selQ } from './engine/selector.js';
import { renderHUD, falarAda, mostrarModal, atualizarAvatar, tocarSFX, toggleMusica, toggleVoz } from './ui-manager.js';

// Variáveis de Controle da Arena
let scoreA = 0, scoreB = 0;
let turnoAtual = 'A';
let modoBuzzer = false;
let historicoGlobal = new Set(); // BLOQUEIO ABSOLUTO DE REPETIÇÃO

/** 
 * 1. PROTOCOLO DE ACESSO (Splash Screen)
 */
window.mostrarSeletorBlocos = () => {
    const nomeInput = document.getElementById('nome-cientista');
    if (!nomeInput.value.trim()) {
        alert("Identifique-se, Cientista Master!");
        return;
    }
    G.nome = nomeInput.value.toUpperCase();
    
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('block-selector').classList.remove('hidden');
    tocarSFX('sfx_start');
    salvarProgresso();
};

/** 
 * 2. CARREGAMENTO DE BLOCO (1 a 5)
 */
window.iniciarBloco = (id) => {
    G.blocoAtivo = id;
    // Reseta o placar da batalha para o novo bloco
    scoreA = 0; scoreB = 0; 
    atualizarPlacarVisual();
    
    document.getElementById('block-selector').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    if (G.musica) document.getElementById('bgm').play().catch(() => {});
    proximaQ();
};

/** 
 * 3. MOTOR DE SORTEIO SEM REPETIÇÃO
 */
window.proximaQ = () => {
    let q = selQ(G.blocoAtivo);
    
    // Busca exaustiva: se a questão já saiu, força o seletor a buscar outra do "Rico Banco"
    let tentativas = 0;
    while (historicoGlobal.has(q.id) && tentativas < 100) {
        q = selQ(G.blocoAtivo);
        tentativas++;
    }
    
    historicoGlobal.add(q.id);
    G.questaoAtual = q;
    G.respondeu = false;
    
    // Atualiza a Interface
    document.getElementById('conta-display').innerText = q.display;
    gerarBotoesResposta(q.botoes);
    renderHUD(null); // Limpa feedbacks anteriores
    
    if (G.voz) falarAda(q.dica);
};

function gerarBotoesResposta(opcoes) {
    const container = document.getElementById('grid-botoes');
    container.innerHTML = '';
    opcoes.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'ba'; // Botão Acessível (DUA)
        btn.innerText = opt;
        btn.onclick = () => verificarAcao(opt);
        container.appendChild(btn);
    });
}

/** 
 * 4. LÓGICA DE BATALHA E PONTUAÇÃO
 */
window.verificarAcao = (escolha) => {
    if (G.respondeu) return;
    G.respondeu = true;

    const q = G.questaoAtual;
    const acerto = String(escolha) === String(q.res);

    if (acerto) {
        tocarSFX('sfx_correct');
        let pts = 10 + (G.combo * 5); // Bónus de Combo
        if (turnoAtual === 'A') scoreA += pts; else scoreB += pts;
        G.combo++;
        atualizarAvatar('ok');
    } else {
        tocarSFX('sfx_wrong');
        G.combo = 0;
        atualizarAvatar('no');
        // No modo alternado, o erro passa a vez para o outro time
        if (!modoBuzzer) turnoAtual = (turnoAtual === 'A') ? 'B' : 'A';
    }

    renderHUD(acerto, q.passo);
    atualizarPlacarVisual();
    
    // Verificação de Vitória do Bloco (Meta 100 pontos)
    if (scoreA >= 100 || scoreB >= 100) {
        setTimeout(() => finalizarBatalhaBloco(), 1500);
    }
};

/** 
 * 5. NAVEGAÇÃO E SISTEMAS
 */
function finalizarBatalhaBloco() {
    const vencedor = scoreA >= 100 ? "7º ANO A" : "7º ANO B";
    alert(`🏆 VITÓRIA! O ${vencedor} DOMINOU O BLOCO ${G.blocoAtivo}!`);
    irParaSeletor();
}

window.irParaSeletor = () => {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('block-selector').classList.remove('hidden');
};

window.toggleBuzzerMode = () => {
    modoBuzzer = !modoBuzzer;
    document.getElementById('btn-buzzer-mode').innerText = modoBuzzer ? "MODO: BUZZER" : "MODO: ALTERNADO";
};

function atualizarPlacarVisual() {
    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;
    document.getElementById('tcb').innerText = G.combo;
    
    // Feedback visual de quem joga agora (DUA)
    document.getElementById('box-a').classList.toggle('ativo', turnoAtual === 'A');
    document.getElementById('box-b').classList.toggle('ativo', turnoAtual === 'B');
}

// Vinculação de funções globais para o HTML
window.toggleMusica = toggleMusica;
window.toggleVoz = toggleVoz;
window.abrirM = abrirM;
window.fecharM = fecharM;
