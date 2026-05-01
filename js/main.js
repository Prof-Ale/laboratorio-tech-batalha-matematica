import { G, salvarProgresso } from './engine/gameState.js';
import { selQ } from './engine/selector.js';
import { renderHUD, falarDica, mostrarModal, atualizarAvatar } from './ui-manager.js';

// Váriaveis de Batalha v6.0
let scoreA = 0, scoreB = 0;
let turnoAtual = 'A';
let modoBuzzer = false;
let perguntasFeitasTotal = new Set(); // Garante não-repetição absoluta

/** 
 * INTERFACE INICIAL (Splash Screen)
 */
window.mostrarSeletorBlocos = () => {
    const nome = document.getElementById('nome-cientista').value;
    if (!nome) {
        alert("Identifique-se, Cientista!");
        return;
    }
    G.nome = nome;
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('block-selector').classList.remove('hidden');
    salvarProgresso();
};

/** 
 * INICIALIZAÇÃO DO BLOCO
 */
window.iniciarBloco = (id) => {
    G.blocoAtivo = id;
    document.getElementById('block-selector').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Inicia música de fundo se estiver ativada
    const bgm = document.getElementById('bgm');
    if (G.musica) bgm.play().catch(e => console.log("Áudio aguardando clique"));
    
    proximaQ();
};

/** 
 * MOTOR DE SORTEIO SEM REPETIÇÃO
 */
window.proximaQ = () => {
    let q = selQ(G.blocoAtivo);
    
    // Se a questão já saiu, tenta buscar outra no pool do bloco
    let tentativas = 0;
    while (perguntasFeitasTotal.has(q.id) && tentativas < 100) {
        q = selQ(G.blocoAtivo);
        tentativas++;
    }
    
    perguntasFeitasTotal.add(q.id);
    G.questaoAtual = q;
    G.respondeu = false;
    
    // Atualiza interface visual (HUD e Botões)
    atualizarInterfaceBatalha(q);
};

/** 
 * LOGICA DE BATALHA E PONTUAÇÃO
 */
window.verificarResposta = (escolha) => {
    if (G.respondeu) return;
    G.respondeu = true;

    const q = G.questaoAtual;
    const acertou = escolha === q.res;

    if (acertou) {
        let pontos = calcularPontos();
        if (turnoAtual === 'A') scoreA += pontos; else scoreB += pontos;
        G.combo++;
        atualizarAvatar('ok'); // Vídeo avatar_jump.mp4
    } else {
        G.combo = 0;
        atualizarAvatar('no'); // Vídeo avatar_chute.mp4
    }

    // Alternância de turno
    if (!modoBuzzer) turnoAtual = (turnoAtual === 'A') ? 'B' : 'A';

    renderHUD(acertou, q.passo);
    atualizarPlacarVisual();
    
    if (scoreA >= 100 || scoreB >= 100) {
        mostrarTelaCampeao();
    }
};

function calcularPontos() {
    let base = 10;
    if (G.combo >= 2) base += 5; // Bônus Combo
    // Adicionar aqui lógica de Rodada Especial (ex: cada 5 questões)
    return base;
}

function atualizarPlacarVisual() {
    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;
    document.getElementById('tcb').innerText = G.combo;
    
    // DUA: Feedback visual de quem joga agora
    document.querySelector('.team-a').classList.toggle('ativo', turnoAtual === 'A');
    document.querySelector('.team-b').classList.toggle('ativo', turnoAtual === 'B');
}

/** 
 * CONTROLES DE ÁUDIO E ACESSIBILIDADE
 */
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

window.abrirM = (id) => mostrarModal(id, true);
window.fecharM = (id) => mostrarModal(id, false);
