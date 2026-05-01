/**
 * ui-manager.js (v6.0 - Master Arena Edition)
 * Especialista: Gestão de Interface, Acessibilidade DUA e Dashboard Clínico.
 * Integrado para o evento "Dia da Matemática 2026" - Milton de Tolosa / IFSP.
 */

import { G, salvarProgresso } from './engine/gameState.js';

const bgm = document.getElementById("bgm");

/* ========================================================
   SISTEMA DE ÁUDIO E VOZ (DUA)
   Múltiplas formas de Representação e Engajamento
======================================================== */

// Pré-carregamento de vozes pt-BR
if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
}

/**
 * Narra dicas e feedbacks (Essencial para Dislexia e TEA)
 */
export function falarAda(texto) {
    try {
        if (!G.voz || !window.speechSynthesis) return;

        window.speechSynthesis.cancel(); 

        const u = new SpeechSynthesisUtterance(texto.replace(/<[^>]*>?/gm, ''));
        const vozes = window.speechSynthesis.getVoices();
        
        // Busca voz pt-BR (Preferência masculina conforme perfil Prof. Alê ou Ada)
        const vozBR = vozes.find(v => v.lang.includes('pt-BR')) || vozes[0];
        
        u.voice = vozBR;
        u.rate = 0.95;
        u.pitch = 1.0;

        // Efeito de Ducking: Diminui a música durante a narração
        u.onstart = () => { if (bgm && G.musica) bgm.volume = 0.02; };
        u.onend   = () => { if (bgm && G.musica) bgm.volume = 0.07; };

        window.speechSynthesis.speak(u);
    } catch (e) {
        console.warn("Falha no motor de voz:", e);
    }
}

/**
 * Gatilho de Efeitos Sonoros (SFX)
 */
export function tocarSFX(tipo) {
    const sfx = new Audio(`./assets/audio/${tipo}.mp3`);
    sfx.volume = 0.4;
    sfx.play().catch(() => {}); 
}

/* ========================================================
   CONTROLES DE INTERFACE E HUD (Ação e Expressão)
======================================================== */

/**
 * Renderiza o estado atual da Arena e Feedback
 */
export function renderHUD(acerto = null, passo = "") {
    const feedbackEl = document.getElementById("fb");
    
    // Atualiza contadores globais no HUD
    document.getElementById("tcb").textContent = G.combo;
    document.getElementById("tnv").textContent = G.nivel;

    if (acerto !== null) {
        // Feedback Colorido e Textual (DUA)
        feedbackEl.innerHTML = acerto 
            ? `<div style="color:var(--neon-green); font-weight:900;">✔️ SISTEMA INTEGRADO: ACERTO!</div><div style="font-size:0.9rem;">${passo}</div>`
            : `<div style="color:var(--neon-red); font-weight:900;">❌ FALHA NA LÓGICA: REVISE!</div><div style="font-size:0.9rem;">${passo}</div>`;
        
        // Bloqueia cliques duplos (Inclusão: evita ansiedade)
        const botoes = document.querySelectorAll(".ba");
        botoes.forEach(b => b.classList.add("dis"));
        
        document.getElementById("btn-prox").classList.remove("hidden");
    } else {
        feedbackEl.innerHTML = "";
        document.getElementById("btn-prox").classList.add("hidden");
    }
}

/**
 * Alterna a música de fundo
 */
export function toggleMusica() {
    G.musica = !G.musica;
    const el = document.getElementById("tsom");
    if (el) el.textContent = G.musica ? "ON" : "OFF";

    if (G.musica && bgm) {
        bgm.volume = 0.07;
        bgm.play().catch(() => {});
    } else if (bgm) {
        bgm.pause();
    }
}

/**
 * Alterna o sintetizador de voz
 */
export function toggleVoz() {
    G.voz = !G.voz;
    const el = document.getElementById("tvoz");
    if (el) el.textContent = G.voz ? "ON" : "OFF";
    if (!G.voz) window.speechSynthesis.cancel();
}

/**
 * Orquestra as reações do Avatar (Vídeo MP4)
 */
export function atualizarAvatar(status) {
    const img = document.getElementById("av-img");
    const vidOk = document.getElementById("vid-ok");
    const vidNo = document.getElementById("vid-no");

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
   DASHBOARD BNCC: ANÁLISE CLÍNICA DE BARREIRAS
======================================================== */

export function mostrarModal(id, status) {
    const modal = document.getElementById(id);
    if (status) {
        modal.classList.add("show");
        if (id === 'mdash') gerarDashboardClinico();
    } else {
        modal.classList.remove("show");
    }
}

function gerarDashboardClinico() {
    const container = document.getElementById("dash-content");
    container.innerHTML = "";

    if (Object.keys(G.historico).length === 0) {
        container.innerHTML = "<p style='text-align:center;'>Nenhum dado coletado. Inicie a batalha!</p>";
        return;
    }

    for (let hab in G.historico) {
        const h = G.historico[hab];
        const total = h.acertos + h.erros_sinal + h.erros_calculo;
        if (total === 0) continue;

        const txAcerto = Math.round((h.acertos / total) * 100);

        // Lógica Pedagógica de Identificação de Barreiras
        let alerta = "";
        if (h.erros_sinal > h.erros_calculo) {
            alerta = `<div class="alerta">⚠️ <b>Barreira de Sinal:</b> O aluno domina a conta, mas falha na regra de sinais.</div>`;
        } else if (h.erros_calculo > h.erros_sinal) {
            alerta = `<div class="alerta" style="border-color:var(--neon-red)">🚨 <b>Barreira de Cálculo:</b> O conceito está claro, mas a aritmética básica precisa de reforço.</div>`;
        } else if (txAcerto >= 75) {
            alerta = `<div class="alerta" style="border-color:var(--neon-green)">🌟 <b>Proficiência:</b> Pronto para novos desafios algébricos!</div>`;
        }

        container.innerHTML += `
            <div class="dash-card">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color:var(--choco-gold)">${hab}</strong>
                    <span>${txAcerto}%</span>
                </div>
                <div style="font-size:0.8rem; margin:5px 0;">${h.desc || ""}</div>
                <div class="dash-bar">
                    <div class="dash-fill-ok" style="width:${txAcerto}%"></div>
                    <div class="dash-fill-no" style="width:${100 - txAcerto}%"></div>
                </div>
                ${alerta}
            </div>
        `;
    }
}
