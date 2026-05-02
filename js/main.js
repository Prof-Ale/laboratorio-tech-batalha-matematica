/**
 * js/main.js - Orquestrador Geral v6.1
 * Batalha Matemática: 7ºA vs 7ºB — Dia da Matemática 2026
 * Correções: abrirM/fecharM, finalizarBatalha via modal, voltarAoSplash
 */

import { G, salvarProgresso, carregarProgresso } from './engine/gameState.js';
import { selQ } from './engine/selector.js';
import {
    renderHUD,
    falarAda,
    mostrarModal,
    atualizarAvatar,
    tocarSFX,
    toggleMusica,
    toggleVoz,
    exportarCSV
} from './ui-manager.js';

// ── Estado da Batalha ─────────────────────────────────────
let scoreA = 0, scoreB = 0;
let turnoAtual = 'A';
let rodadaAtual = 1;
let modoBuzzer = false;
let buzzerAtivo = null;
let historicoGlobal = new Set();

// ── Inicialização ─────────────────────────────────────────
carregarProgresso();

// ═════════════════════════════════════════════════════════
// 1. SPLASH SCREEN
// ═════════════════════════════════════════════════════════
window.mostrarSeletorBlocos = () => {
    const nomeInput = document.getElementById('nome-cientista');
    G.nome = nomeInput.value.trim().toUpperCase() || 'CIENTISTA MASTER';

    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('block-selector').classList.remove('hidden');
    tocarSFX('sfx_start');
    salvarProgresso();
};

window.voltarAoSplash = () => {
    document.getElementById('block-selector').classList.add('hidden');
    document.getElementById('splash-screen').classList.remove('hidden');
};

// ═════════════════════════════════════════════════════════
// 2. SELETOR DE BLOCOS
// ═════════════════════════════════════════════════════════
window.iniciarBloco = (id) => {
    G.blocoAtivo = id;
    scoreA = 0;
    scoreB = 0;
    rodadaAtual = 1;
    buzzerAtivo = null;
    G.combo = 0;
    G.acertos = 0;
    G.erros = 0;
    historicoGlobal.clear();

    atualizarPlacarVisual();

    document.getElementById('block-selector').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');

    // Mostra avatar
    const av = document.getElementById('av');
    if (av) av.classList.remove('hidden');

    // BGM
    const bgm = document.getElementById('bgm');
    if (bgm && G.musica) bgm.play().catch(() => {});

    proximaQ();
};

window.irParaSeletor = () => {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('go').classList.remove('show');
    document.getElementById('block-selector').classList.remove('hidden');
};

// ═════════════════════════════════════════════════════════
// 3. MOTOR DE QUESTÕES
// ═════════════════════════════════════════════════════════
window.proximaQ = () => {
    // Sorteio com bloqueio absoluto de repetição
    let q = selQ(G.blocoAtivo);
    let tentativas = 0;
    while (historicoGlobal.has(q.id) && tentativas < 80) {
        q = selQ(G.blocoAtivo);
        tentativas++;
    }
    // Se esgotou todas as questões do bloco, reseta o histórico do bloco
    if (tentativas >= 80) historicoGlobal.clear();

    historicoGlobal.add(q.id);
    G.questaoAtual = q;
    G.respondeu = false;

    // Renderiza enunciado
    document.getElementById('conta-display').innerHTML = `<span>${q.display}</span>`;

    // Renderiza dica
    const regra = document.getElementById('regra-box');
    if (regra) regra.innerHTML = q.dica || '';

    // Gera botões embaralhados
    gerarBotoes(shuffled([...q.botoes]));

    // Limpa feedback
    renderHUD(null);

    // Atualiza indicador de turno
    atualizarIndicadorTurno();

    // Voz (DUA)
    if (G.voz) falarAda(q.dica || q.display);
};

function shuffled(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function gerarBotoes(opcoes) {
    const container = document.getElementById('grid-botoes');
    container.innerHTML = '';

    container.style.gridTemplateColumns = opcoes.length <= 3
        ? `repeat(${opcoes.length}, 1fr)`
        : '1fr 1fr';

    opcoes.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'ba';
        btn.textContent = opt;
        btn.setAttribute('tabindex', '0');
        btn.onclick = () => {
            // Modo buzzer: bloqueia até uma turma acionar
            if (modoBuzzer && buzzerAtivo === null) {
                const fb = document.getElementById('fb');
                if (fb) {
                    fb.style.color = 'var(--neon-yellow)';
                    fb.innerHTML = '⏳ Aperte <strong>[A]</strong> ou <strong>[B]</strong> no teclado primeiro!';
                }
                return;
            }
            verificarResposta(opt);
        };
        container.appendChild(btn);
    });
}

// ═════════════════════════════════════════════════════════
// 4. LÓGICA DE BATALHA E PONTUAÇÃO
// ═════════════════════════════════════════════════════════
function verificarResposta(escolha) {
    if (G.respondeu) return;
    G.respondeu = true;

    const q = G.questaoAtual;
    const acerto = Array.isArray(q.res)
        ? q.res.map(String).includes(String(escolha))
        : String(escolha) === String(q.res);

    // Destaca botões
    document.querySelectorAll('.ba').forEach(b => {
        b.classList.add('dis');
        const resArr = Array.isArray(q.res) ? q.res.map(String) : [String(q.res)];
        if (resArr.includes(b.textContent)) b.classList.add('ok');
        if (b.textContent === String(escolha) && !acerto) b.classList.add('no');
    });

    // Registra no histórico BNCC
    registrarBNCC(q, acerto, escolha);

    if (acerto) {
        G.acertos++;
        G.combo++;
        if (G.combo % 5 === 0) G.nivel++;

        const turma = modoBuzzer ? buzzerAtivo : turnoAtual;
        const pts = calcularPontos();

        if (turma === 'A') { scoreA += pts; turnoAtual = 'B'; }
        else               { scoreB += pts; turnoAtual = 'A'; }

        tocarSFX('sfx_correct');
        atualizarAvatar('ok');
        renderHUD(true, q.passo, pts, turma);
    } else {
        G.erros++;
        G.combo = 0;

        if (!modoBuzzer) turnoAtual = (turnoAtual === 'A') ? 'B' : 'A';

        tocarSFX('sfx_wrong');
        atualizarAvatar('no');
        renderHUD(false, q.passo, 0, null);
    }

    buzzerAtivo = null;
    rodadaAtual++;
    atualizarPlacarVisual();
    salvarProgresso();

    // Verifica vitória
    if (scoreA >= 250 || scoreB >= 250) {
        setTimeout(finalizarBatalha, 1200);
    }
}

function calcularPontos() {
    const combo = Math.min(G.combo * 5, 15);
    const especial = (rodadaAtual % 5 === 0) ? 2 : 1; // rodada especial dobra
    const final = (scoreA >= 180 || scoreB >= 180) ? 1.5 : 1; // desafio final +50%
    return Math.round((10 + combo) * especial * final);
}

function registrarBNCC(q, acerto, escolha) {
    if (!q.bncc) return;
    if (!G.historico[q.bncc]) {
        G.historico[q.bncc] = {
            desc: q.bncc_desc || q.bncc,
            acertos: 0, erros_sinal: 0, erros_calculo: 0,
            bloco: G.blocoAtivo
        };
    }
    const h = G.historico[q.bncc];
    if (acerto) {
        h.acertos++;
    } else {
        // Diferencia erro de sinal de erro de cálculo
        const resNum = Number(q.res);
        const escolhaNum = Number(escolha);
        if (!isNaN(resNum) && !isNaN(escolhaNum) && escolhaNum === -resNum) {
            h.erros_sinal++;
        } else {
            h.erros_calculo++;
        }
    }
}

// ═════════════════════════════════════════════════════════
// 5. PLACAR E INDICADORES VISUAIS
// ═════════════════════════════════════════════════════════
function atualizarPlacarVisual() {
    document.getElementById('scoreA').textContent = scoreA;
    document.getElementById('scoreB').textContent = scoreB;
    document.getElementById('tcb').textContent = G.combo;

    const elNv = document.getElementById('tnv');
    if (elNv) elNv.textContent = G.nivel;

    const elAc = document.getElementById('tac');
    if (elAc) elAc.textContent = G.acertos;

    const elEr = document.getElementById('ter');
    if (elEr) elEr.textContent = G.erros;

    // Destaque do time da vez
    const boxA = document.getElementById('box-a');
    const boxB = document.getElementById('box-b');
    const turma = modoBuzzer ? (buzzerAtivo || 'none') : turnoAtual;
    if (boxA) boxA.classList.toggle('ativo', turma === 'A');
    if (boxB) boxB.classList.toggle('ativo', turma === 'B');

    // Animação de pulso no scoreboard
    const sb = document.getElementById('scoreboard-battle');
    if (sb) {
        sb.classList.remove('score-pulse');
        void sb.offsetWidth;
        sb.classList.add('score-pulse');
    }
}

function atualizarIndicadorTurno() {
    const fb = document.getElementById('fb');
    if (!fb) return;
    if (modoBuzzer && buzzerAtivo === null) {
        fb.style.color = 'var(--neon-cyan)';
        fb.innerHTML = `⚔️ Rodada ${rodadaAtual} — Aperte <strong>[A]</strong> ou <strong>[B]</strong>`;
    } else {
        const turma = modoBuzzer ? buzzerAtivo : turnoAtual;
        fb.style.color = 'var(--neon-cyan)';
        fb.innerHTML = `⚔️ Rodada ${rodadaAtual} — Vez do <strong>7º${turma}</strong>`;
    }
}

// ═════════════════════════════════════════════════════════
// 6. FINALIZAÇÃO DA BATALHA
// ═════════════════════════════════════════════════════════
const NOMES_BLOCOS = {
    1: "Inteiros: Soma e Subtração",
    2: "Múltiplos e Divisores",
    3: "Inteiros: Multiplicação e Divisão",
    4: "Frações, Decimais e Porcentagem",
    5: "MMC e MDC"
};
const TOTAL_BLOCOS = 5;
const META_PONTOS = 250;

function finalizarBatalha() {
    const vencedor = scoreA >= scoreB ? '7ºA' : '7ºB';
    const blocoAtual = G.blocoAtivo;
    const proximoBloco = blocoAtual < TOTAL_BLOCOS ? blocoAtual + 1 : null;

    const go = document.getElementById('go');
    const goTxt = document.getElementById('go-txt');
    const goStats = document.getElementById('go-stats');

    if (goTxt) {
        goTxt.textContent = `🏆 ${vencedor} venceu o Bloco ${blocoAtual}!`;
    }

    if (goStats) {
        const proximoLabel = proximoBloco
            ? `<p style="margin-top:10px;color:var(--neon-cyan);">⏭️ Próximo: <strong>Bloco ${proximoBloco} — ${NOMES_BLOCOS[proximoBloco]}</strong></p>`
            : `<p style="margin-top:10px;color:var(--neon-green);">🎓 Todos os blocos concluídos!</p>`;

        goStats.innerHTML = `
            <p>7ºA: <strong>${scoreA}</strong> pts &nbsp;|&nbsp; 7ºB: <strong>${scoreB}</strong> pts</p>
            <p>Bloco ${blocoAtual}: <strong>${NOMES_BLOCOS[blocoAtual]}</strong></p>
            <p>Rodadas: ${rodadaAtual - 1} &nbsp;|&nbsp; Acertos: ${G.acertos}</p>
            ${proximoLabel}
        `;
    }

    // Atualiza o botão: "Próximo Bloco" ou "Nova Batalha"
    const btnReiniciar = document.querySelector('#go .btn-start');
    if (btnReiniciar) {
        if (proximoBloco) {
            btnReiniciar.textContent = `▶️ Bloco ${proximoBloco}: ${NOMES_BLOCOS[proximoBloco]}`;
            btnReiniciar.onclick = () => {
                document.getElementById('go').classList.remove('show');
                iniciarBloco(proximoBloco);
            };
        } else {
            btnReiniciar.textContent = '🔁 Jogar de Novo (Bloco 1)';
            btnReiniciar.onclick = () => {
                document.getElementById('go').classList.remove('show');
                iniciarBloco(1);
            };
        }
    }

    if (go) go.classList.add('show');
    tocarSFX('sfx_victory');
    mostrarFogos();
}

function mostrarFogos() {
    const fx = document.createElement('div');
    fx.id = 'fx-fogos';
    fx.innerHTML = '<span>✨</span><span>🎉</span><span>✨</span><span>🎊</span><span>✨</span>';
    document.body.appendChild(fx);
    setTimeout(() => fx.remove(), 2800);
}

window.reiniciar = () => {
    document.getElementById('go').classList.remove('show');
    // Reinicia o mesmo bloco atual
    iniciarBloco(G.blocoAtivo);
};

// ═════════════════════════════════════════════════════════
// 7. MODO BUZZER (Teclas A e B)
// ═════════════════════════════════════════════════════════
window.toggleBuzzerMode = () => {
    modoBuzzer = !modoBuzzer;
    buzzerAtivo = null;
    const btn = document.getElementById('btn-buzzer-mode');
    if (btn) {
        btn.textContent = modoBuzzer ? '🎯 MODO: BUZZER' : '🔄 MODO: ALTERNADO';
        btn.style.background = modoBuzzer ? 'var(--neon-cyan)' : '';
        btn.style.color      = modoBuzzer ? '#000' : '';
    }
    atualizarIndicadorTurno();
};

document.addEventListener('keydown', e => {
    // Buzzer: A e B só funcionam no modo buzzer e antes de responder
    if (modoBuzzer && !G.respondeu) {
        if ((e.key === 'a' || e.key === 'A') && buzzerAtivo === null) {
            buzzerAtivo = 'A';
            atualizarIndicadorTurno();
            atualizarPlacarVisual();
            tocarSFX('sfx_tick');
        }
        if ((e.key === 'b' || e.key === 'B') && buzzerAtivo === null) {
            buzzerAtivo = 'B';
            atualizarIndicadorTurno();
            atualizarPlacarVisual();
            tocarSFX('sfx_tick');
        }
    }

    // Navegação por teclado (DUA)
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.tagName === 'BUTTON') {
        document.activeElement.click();
        e.preventDefault();
    }
});

// ═════════════════════════════════════════════════════════
// 8. MODAIS — ponte entre HTML (abrirM/fecharM) e ui-manager (mostrarModal)
// ═════════════════════════════════════════════════════════
window.abrirM = (id) => mostrarModal(id, true);
window.fecharM = (id) => mostrarModal(id, false);

window.verPerfilAluno = () => {
    const patente = G.nivel > 5 ? 'Cientista Master' : 'Explorador';
    alert(`Cientista: ${G.nome}\nPatente: ${patente}\nAcertos: ${G.acertos} | Erros: ${G.erros}`);
};

window.exportarRelatorioCSV = () => exportarCSV();

// Vincula os demais controles
window.toggleMusica = toggleMusica;
window.toggleVoz = toggleVoz;
