/**
 * ui-manager.js (v4.0 - Arena Edition)
 * Especialista: Gestão de Interface, Áudio DUA e Análise Pedagógica.
 * Foco: Batalha Matemática 7º Ano - IFSP / Milton de Tolosa.
 */

import { G, salvarProgresso } from './engine/gameState.js';

const bgm = document.getElementById("bgm");

/* ========================================================
   SISTEMA DE ÁUDIO E VOZ (DUA)
======================================================== */

// Pré-carregamento de vozes para o navegador
if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
}

/**
 * Narra dicas e feedbacks (Múltiplas formas de Representação)
 */
export function falarAda(texto) {
    try {
        if (!G.voz || !window.speechSynthesis) return;

        window.speechSynthesis.cancel(); // Interrompe fala anterior

        const u = new SpeechSynthesisUtterance(texto.replace(/<[^>]*>?/gm, ''));
        const vozes = window.speechSynthesis.getVoices();
        
        // Preferência por vozes pt-BR naturais
        const vozBR = vozes.find(v => v.lang.includes('pt-BR')) || vozes[0];
        
        u.voice = vozBR;
        u.rate = 1.0;
        u.pitch = 1.0;

        // Ducking: Abaixa a música para a voz ser ouvida
        u.onstart = () => { if (bgm && G.musica) bgm.volume = 0.02; };
        u.onend   = () => { if (bgm && G.musica) bgm.volume = 0.07; };

        window.speechSynthesis.speak(u);
    } catch (e) {
        console.warn("Falha no TTS:", e);
    }
}

/**
 * Executa efeitos sonoros curtos (SFX)
 */
export function tocarSFX(tipo) {
    const sfx = new Audio(`./assets/audio/${tipo}.mp3`);
    sfx.volume = 0.4;
    sfx.play().catch(() => {}); // Ignora se o navegador bloquear
}

/* ========================================================
   CONTROLES DE INTERFACE E HUD
======================================================== */

export function renderHUD(acerto = null, passo = "") {
    const feedbackEl = document.getElementById("fb");
    const gridBotoes = document.getElementById("grid-botoes");

    // HUD Elements
    document.getElementById("tcb").textContent = G.combo;
    document.getElementById("tnv").textContent = G.nivel;
    document.getElementById("fen").style.width = `${G.energia}%`;
    document.getElementById("fv").style.width  = `${G.vida}%`;

    if (acerto !== null) {
        feedbackEl.innerHTML = acerto 
            ? `<span style="color:var(--neon-green)">✔️ CORRETO!</span> <br> <small>${passo}</small>`
            : `<span style="color:var(--neon-red)">❌ TENTE NOVAMENTE!</span> <br> <small>${passo}</small>`;
        
        // Trava os botões após responder
        const botoes = document.querySelectorAll(".ba");
        botoes.forEach(b => b.classList.add("dis"));
        
        // Mostra o botão de Próxima
        document.getElementById("btn-prox").classList.remove("hidden");
    } else {
        feedbackEl.innerHTML = "";
        document.getElementById("btn-prox").classList.add("hidden");
    }
}

export function atualizarAvatar(status) {
    const img = document.getElementById("av-img");
    const vidOk = document.getElementById("vid-ok");
    const vidNo = document.getElementById("vid-no");

    // Esconde tudo e mostra o vídeo correspondente
    [img, vidOk, vidNo].forEach(el => el.classList.add("avh"));

    const target = status === 'ok' ? vidOk : vidNo;
    target.classList.remove("avh");
    target.currentTime = 0;
    target.play().catch(() => img.classList.remove("avh"));

    target.onended = () => {
        target.classList.add("avh");
        img.classList.remove("avh");
    };
}

/* ========================================================
   DASHBOARD CLÍNICO (ANÁLISE DE BARREIRAS)
======================================================== */

export function mostrarModal(id, status) {
    const modal = document.getElementById(id);
    if (status) {
        modal.classList.add("show");
        if (id === 'mdash') gerarRelatorioClinico();
    } else {
        modal.classList.remove("show");
    }
}

function gerarRelatorioClinico() {
    const container = document.getElementById("dash-content");
    container.innerHTML = "";

    if (Object.keys(G.historico).length === 0) {
        container.innerHTML = "<p>Sem dados para análise ainda.</p>";
        return;
    }

    for (let hab in G.historico) {
        const h = G.historico[hab];
        const total = h.acertos + h.erros_sinal + h.erros_calculo;
        const txAcerto = Math.round((h.acertos / total) * 100);

        let insightPedagogico = "";
        if (h.erros_sinal > h.erros_calculo) {
            insightPedagogico = "<b>Dica:</b> Focar em atividades de reta numérica (conceito de direção).";
        } else if (h.erros_calculo > h.erros_sinal) {
            insightPedagogico = "<b>Dica:</b> Necessário reforço em algoritmos de tabuada e cálculo mental.";
        }

        container.innerHTML += `
            <div class="dash-card">
                <h3>${hab} - ${txAcerto}%</h3>
                <p>${h.desc || ""}</p>
                <div class="dash-bar">
                    <div class="dash-fill-ok" style="width:${txAcerto}%"></div>
                    <div class="dash-fill-no" style="width:${100-txAcerto}%"></div>
                </div>
                <small>${insightPedagogico}</small>
            </div>
        `;
    }
}
