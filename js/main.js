import { G, salvarProgresso } from './engine/gameState.js';
import { selQ } from './engine/selector.js';
import { renderHUD, falarAda, mostrarModal, atualizarAvatar, tocarSFX, toggleMusica, toggleVoz } from './ui-manager.js';

let scoreA = 0, scoreB = 0, turno = 'A', modoBuzzer = false, perguntasVistas = new Set();

// Exposição Global para botões HTML
window.mostrarSeletorBlocos = () => {
    const nome = document.getElementById('nome-cientista').value;
    if (!nome) return alert("Cientista, identifique-se!");
    G.nome = nome;
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('block-selector').classList.remove('hidden');
};

window.iniciarBloco = (id) => {
    G.blocoAtivo = id;
    perguntasVistas.clear();
    document.getElementById('block-selector').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    proximaQ();
};

window.proximaQ = () => {
    let q = selQ(G.blocoAtivo);
    
    // Filtro Anti-Repetição (Busca questão nova no banco rico)
    let tentativas = 0;
    while (perguntasVistas.has(q.id) && tentativas < 50) {
        q = selQ(G.blocoAtivo);
        tentativas++;
    }
    
    perguntasVistas.add(q.id);
    G.questaoAtual = q;
    G.respondeu = false;
    
    document.getElementById('conta-display').innerText = q.display;
    gerarBotoes(q.botoes);
    renderHUD(null);
    if (G.voz) falarAda(q.dica);
};

function gerarBotoes(opcoes) {
    const container = document.getElementById('grid-botoes');
    container.innerHTML = '';
    opcoes.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'ba';
        btn.innerText = opt;
        btn.onclick = () => verificar(opt);
        container.appendChild(btn);
    });
}

window.verificar = (escolha) => {
    if (G.respondeu) return;
    G.respondeu = true;
    const acerto = String(escolha) === String(G.questaoAtual.res);
    
    if (acerto) {
        if (turno === 'A') scoreA += 10; else scoreB += 10;
        G.combo++;
        atualizarAvatar('ok');
        tocarSFX('sfx_correct');
    } else {
        G.combo = 0;
        atualizarAvatar('no');
        tocarSFX('sfx_wrong');
    }

    if (!modoBuzzer) turno = (turno === 'A') ? 'B' : 'A';
    
    renderHUD(acerto, G.questaoAtual.passo);
    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;
    
    if (scoreA >= 100 || scoreB >= 100) finalizarBloco();
};

window.toggleBuzzerMode = () => {
    modoBuzzer = !modoBuzzer;
    document.getElementById('btn-buzzer-mode').innerText = modoBuzzer ? "MODO: BUZZER" : "MODO: ALTERNADO";
};

window.irParaSeletor = () => {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('block-selector').classList.remove('hidden');
};

// Vinculação de funções de áudio do ui-manager
window.toggleMusica = toggleMusica;
window.toggleVoz = toggleVoz;
window.abrirM = abrirM;
