/**
 * LABORATÓRIO TECH - BATALHA MATEMÁTICA v6.0
 * Orquestrador Principal: Gerenciamento de Batalha, Sorteio e Áudio
 */

import { G, salvarProgresso } from './engine/gameState.js';
import { selQ } from './engine/selector.js';
import { renderHUD, falarDica, mostrarModal, atualizarAvatar, tocarSFX } from './ui-manager.js';

// Variáveis de Estado da Batalha (Locais para não sobrecarregar o G)
let scoreA = 0, scoreB = 0;
let turnoAtual = 'A';
let modoBuzzer = false;
let rodadaAtual = 0;
let perguntasFeitasSessao = new Set(); // Controle rigoroso de não-repetição

/**
 * PROTOCOLO DE ACESSO (Splash Screen)
 */
window.mostrarSeletorBlocos = () => {
    const nomeInput = document.getElementById('nome-cientista');
    if (!nomeInput.value.trim()) {
        tocarSFX('sfx_wrong'); // Alerta sonoro de erro
        alert("Identifique-se, Cientista Master!");
        return;
    }
    G.nome = nomeInput.value.toUpperCase();
    tocarSFX('sfx_start');
    
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('block-selector').classList.remove('hidden');
    salvarProgresso();
};

/**
 * INICIALIZAÇÃO DE SISTEMAS (Seleção de Bloco)
 */
window.iniciarBloco = (id) => {
    G.blocoAtivo = id;
    G.acertos = 0;
    G.combo = 0;
    rodadaAtual = 0;
    
    document.getElementById('block-selector').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Gerenciamento de Áudio Imersivo
    const bgm = document.getElementById('bgm');
    if (G.musica) {
        bgm.src = 'assets/audio/bgm_battle.mp3';
        bgm.play().catch(() => console.log("Interação necessária para áudio."));
    }
    
    proximaQ();
};

/**
 * MOTOR DE SORTEIO INTELIGENTE
 */
window.proximaQ = () => {
    let q = selQ(G.blocoAtivo);
    
    // Fallback: Se a questão já saiu, tenta buscar outra (até 100 tentativas)
    let tentativas = 0;
    while (perguntasFeitasSessao.has(q.id) && tentativas < 100) {
        q = selQ(G.blocoAtivo);
        tentativas++;
    }
    
    perguntasFeitasSessao.add(q.id);
    G.questaoAtual = q;
    G.respondeu = false;
    rodadaAtual++;
    
    // Atualiza HUD e fala a dica se voz estiver ativa
    renderHUD(null, q.passo); 
    if (G.voz) falarDica(q.dica);
    
    atualizarInterfaceBatalha(q);
};

/**
 * LÓGICA DE BATALHA E PONTUAÇÃO DINÂMICA
 */
window.verificarResposta = (escolha) => {
    if (G.respondeu) return;
    G.respondeu = true;

    const q = G.questaoAtual;
    const acertou = (String(escolha) === String(q.res));

    if (acertou) {
        tocarSFX('sfx_correct');
        let pontosGanhos = calcularPontos();
        
        if (turnoAtual === 'A') scoreA += pontosGanhos; 
        else scoreB += pontosGanhos;
        
        G.combo++;
        G.acertos++;
        atualizarAvatar('ok'); // Ativa avatar_jump.mp4
    } else {
        tocarSFX('sfx_wrong');
        G.combo = 0;
        G.erros++;
        atualizarAvatar('no'); // Ativa avatar_chute.mp4
    }

    // Alternância de Turno (Desativada se modo Buzzer estiver ativo)
    if (!modoBuzzer) {
        turnoAtual = (turnoAtual === 'A') ? 'B' : 'A';
    }

    renderHUD(acertou, q.passo);
    atualizarPlacarVisual();
    salvarProgresso();
    
    // Verificação de Vitória (Meta: 100 pontos)
    if (scoreA >= 100 || scoreB >= 100) {
        setTimeout(mostrarTelaCampeao, 1500);
    }
};

/**
 * SISTEMA DE CÁLCULO GAMIFICADO
 */
function calcularPontos() {
    let base = 10;
    // Bônus de Combo: +5 pontos por nível de combo (máx +15)
    let bonusCombo = Math.min(G.combo * 5, 15);
    
    let total = base + bonusCombo;
    
    // Rodada Especial: Dobra os pontos a cada 5 rodadas
    if (rodadaAtual % 5 === 0) {
        total *= 2;
        tocarSFX('sfx_tick'); // Som de alerta especial
    }
    
    return total;
}

/**
 * ATUALIZAÇÃO DO PLACAR (DUA - Feedback Visual)
 */
function atualizarPlacarVisual() {
    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;
    document.getElementById('tcb').innerText = G.combo;
    
    // Destaque visual da equipe ativa (Princípio do DUA: Clareza)
    const boxA = document.getElementById('box-a');
    const boxB = document.getElementById('box-b');
    
    if (turnoAtual === 'A') {
        boxA.classList.add('ativo');
        boxB.classList.remove('ativo');
    } else {
        boxB.classList.add('ativo');
        boxA.classList.remove('ativo');
    }
}

/**
 * CONTROLES DE ACESSIBILIDADE E MULTIMÍDIA
 */
window.toggleMusica = () => {
    G.musica = !G.musica;
    const bgm = document.getElementById('bgm');
    if (G.musica) {
        bgm.play();
        document.getElementById('tsom').innerText = 'ON';
    } else {
        bgm.pause();
        document.getElementById('tsom').innerText = 'OFF';
    }
};

window.toggleVoz = () => {
    G.voz = !G.voz;
    document.getElementById('tvoz').innerText = G.voz ? 'ON' : 'OFF';
    if (!G.voz) window.speechSynthesis.cancel();
};

// Funções de Modal exportadas para o HTML
window.abrirM = (id) => mostrarModal(id, true);
window.fecharM = (id) => mostrarModal(id, false);
