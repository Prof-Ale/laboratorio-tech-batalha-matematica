// Importações baseadas na estrutura do seu relatório técnico
import { G, salvarProgresso } from './engine/gameState.js';
import { selQ } from './engine/selector.js';
import { renderHUD, falarDica, mostrarModal, atualizarAvatar } from './ui-manager.js';

// Variáveis de Controle da Batalha
let scoreA = 0, scoreB = 0;
let turnoAtual = 'A';
let modoBuzzer = false;
let perguntasFeitasNoBloco = []; // CONTROLE DE REPETIÇÃO

/** 
 * EXPOSIÇÃO PARA O HTML (Conserta o erro "is not defined")
 */
window.mostrarSeletorBlocos = () => {
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('block-selector').classList.remove('hidden');
};

window.iniciarBloco = (id) => {
    G.blocoAtivo = id;
    perguntasFeitasNoBloco = []; // Reseta histórico ao trocar de bloco
    document.getElementById('block-selector').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    proximaQ();
};

window.proximaQ = () => {
    // Motor de sorteio sem repetição
    let q = selQ(G.blocoAtivo);
    
    // Se a questão já saiu, tenta outra até esgotar o banco
    let tentativas = 0;
    while (perguntasFeitasNoBloco.includes(q.id) && tentativas < 50) {
        q = selQ(G.blocoAtivo);
        tentativas++;
    }
    
    perguntasFeitasNoBloco.push(q.id);
    G.questaoAtual = q;
    G.respondeu = false;
    
    atualizarInterface(q);
};

window.verificarResposta = (escolha) => {
    if (G.respondeu) return;
    G.respondeu = true;

    const acertou = escolha === G.questaoAtual.res;
    
    if (acertou) {
        if (turnoAtual === 'A') scoreA += 10; else scoreB += 10;
        G.combo++;
        atualizarAvatar('ok'); // Ativa animação jump
    } else {
        G.combo = 0;
        atualizarAvatar('no'); // Ativa animação chute
    }

    // Alternância de turno automática (se não for modo Buzzer)
    if (!modoBuzzer) {
        turnoAtual = turnoAtual === 'A' ? 'B' : 'A';
    }

    renderHUD(acertou, G.questaoAtual.passo);
    atualizarPlacarVisual();
    salvarProgresso();
};

// Controles de Áudio
window.toggleMusica = () => {
    G.musica = !G.musica;
    const bgm = document.getElementById('bgm');
    G.musica ? bgm.play() : bgm.pause();
    document.getElementById('tsom').innerText = G.musica ? 'ON' : 'OFF';
};

window.toggleVoz = () => {
    G.voz = !G.voz;
    document.getElementById('tvoz').innerText = G.voz ? 'ON' : 'OFF';
};

// Função de Batalha: Modo Buzzer
window.toggleBuzzerMode = () => {
    modoBuzzer = !modoBuzzer;
    document.getElementById('btn-buzzer-mode').innerText = modoBuzzer ? "🔄 Modo: Buzzer" : "🔄 Modo: Alternado";
};

function atualizarPlacarVisual() {
    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;
    document.getElementById('box-a').classList.toggle('active', turnoAtual === 'A');
    document.getElementById('box-b').classList.toggle('active', turnoAtual === 'B');
}

// Modais
window.abrirM = (id) => mostrarModal(id, true);
window.fecharM = (id) => mostrarModal(id, false);
