/**
 * ui-manager.js
 * Gestor de Interface e Dashboard Clínico (Versão 3.2 - Seminário IFSP)
 * Responsável pelo DUA (Voz), HUD e pelo Mapa de Calor de Erros (Cálculo vs. Sinal).
 * Gestor de Interface e Dashboard Clínico (Versão 3.2 - controles de mídia separados)
 * Música e voz agora são independentes.
 */

import { G } from './engine/gameState.js';

const bgm = document.getElementById("bgm");

/* ========================================================
   VOZES: carrega lista assim que o navegador disponibilizar
======================================================== */
if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
}

/* ========================================================
   SÍNTESE DE VOZ (TEXT-TO-SPEECH)
   Controlada por G.voz — independente de G.musica
======================================================== */
export function narrarContexto(t) {
    try {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        if (!G.voz) return;

        window.speechSynthesis.cancel();

        const textoLimpo = t.replace(/<[^>]*>?/gm, '');
        const u = new SpeechSynthesisUtterance(textoLimpo);
        const vozes = window.speechSynthesis.getVoices();

        const masc = vozes.find(x =>
            x.lang.includes('pt-BR') &&
            (x.name.toLowerCase().includes('male') ||
             x.name.toLowerCase().includes('daniel') ||
             x.name.toLowerCase().includes('antonio'))
        );

        u.lang = "pt-BR";
        u.rate = 0.93;

        if (masc) {
            u.voice = masc;
            u.pitch = 0.9;
        } else {
            const vozesBR = vozes.filter(x => x.lang.includes('pt-BR'));
            if (vozesBR.length > 0) u.voice = vozesBR[vozesBR.length - 1];
            u.pitch = 0.6;
        }

        // Baixa o BGM enquanto fala — só se a música estiver ligada
        u.onstart = () => { if (bgm && G.musica) bgm.volume = 0.02; };
        u.onend   = () => { if (bgm && G.musica) bgm.volume = 0.07; };
        u.onerror = () => { if (bgm && G.musica) bgm.volume = 0.07; };

        window.speechSynthesis.speak(u);

    } catch (e) {
        console.warn("TTS indisponível:", e);
    }
}

/* ========================================================
   CONTROLES DE MÍDIA SEPARADOS
======================================================== */

// Botão MÚSICA — não toca nem pausa a voz
export function toggleMusica() {
    G.musica = !G.musica;
    const el = document.getElementById("tsom");
    if (el) el.textContent = G.musica ? "ON" : "OFF";

    if (G.musica) {
        if (bgm) { bgm.volume = 0.07; bgm.play().catch(() => {}); }
    } else {
        if (bgm) bgm.pause();
    }
}

// Botão VOZ — não mexe na música
export function toggleVoz() {
    G.voz = !G.voz;
    const el = document.getElementById("tvoz");
    if (el) el.textContent = G.voz ? "ON" : "OFF";

    // Interrompe fala em andamento se desligar
    if (!G.voz && window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
}

// Alias para não quebrar chamadas existentes em main.js
export function toggleSom() { toggleMusica(); }

/* ========================================================
   AVATAR
======================================================== */
export function tocarAv(tipo) {
    const img = document.getElementById("av-img");
    const vid = document.getElementById(tipo === "ok" ? "vid-ok" : "vid-no");

    if (!img || !vid) return;

    img.classList.add("avh");
    vid.classList.remove("avh");
    vid.currentTime = 0;
    vid.play().catch(() => {
        vid.classList.add("avh");
        img.classList.remove("avh");
    });

    vid.onended = () => {
        vid.classList.add("avh");
        img.classList.remove("avh");
    };
}

/* ========================================================
   HUD
======================================================== */
export function updHUD() {
    const fv  = document.getElementById("fv");
    const fen = document.getElementById("fen");
    const tcb = document.getElementById("tcb");
    const tnv = document.getElementById("tnv");

    if (fv)  fv.style.width  = G.vida    + "%";
    if (fen) fen.style.width = G.energia + "%";
    if (tcb) tcb.textContent = G.combo;
    if (tnv) tnv.textContent = G.nivel;
}

/* ========================================================
   MODAIS
======================================================== */
export function abrirM(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("show");
    if (id === 'mdash') gerarDashboard();
}

export function fecharM(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("show");
}

/* ========================================================
   DASHBOARD DO PROFESSOR: MAPA DE CALOR CLÍNICO
======================================================== */
function gerarDashboard() {
    const c = document.getElementById("dash-content");
    if (!c) return;
    c.innerHTML = "";

    let temDados = false;

    // A MUDANÇA ESTÁ AQUI: Agora lemos o G.historico diretamente!
    for (let hab in G.historico) {
        const hist = G.historico[hab];
        if (!hist) continue;

        const acertos  = hist.acertos       || 0;
        const errSinal = hist.erros_sinal   || 0;
        const errCalc  = hist.erros_calculo || 0;
        const errGeral = hist.erros         || 0; // Para retrocompatibilidade caso exista

        const total = acertos + errSinal + errCalc + errGeral;
        if (total === 0) continue;
        temDados = true;

        const txAcerto   = Math.round((acertos / total) * 100);
        const txErroSin  = Math.round((errSinal / total) * 100);
        const txErroCalc = Math.round(((errCalc + errGeral) / total) * 100);

        let alerta = "";
        if (errSinal > errCalc && errSinal > 0) {
            alerta = `
                <div style="margin-top:10px;padding:8px;background:rgba(212,160,23,0.1);border-left:3px solid var(--choco-gold);border-radius:4px;font-size:11px;color:var(--choco-cream)">
                    <strong>⚠️ Barreira Conceitual:</strong> O estudante sabe calcular, mas falha sistematicamente na regra de sinais. Sugere-se mediação com a Reta Numérica manipulável.
                </div>`;
        } else if (errCalc > errSinal && errCalc > 0) {
            alerta = `
                <div style="margin-top:10px;padding:8px;background:rgba(255,68,68,0.1);border-left:3px solid var(--neon-red);border-radius:4px;font-size:11px;color:var(--choco-cream)">
                    <strong>🚨 Barreira de Cálculo:</strong> O estudante compreende o conceito, mas sofre com deficiências de aritmética básica. Necessário reforço operacional.
                </div>`;
        } else if (txAcerto >= 70) {
            alerta = `
                <div style="margin-top:10px;padding:8px;background:rgba(0,255,136,0.1);border-left:3px solid var(--neon-green);border-radius:4px;font-size:11px;color:var(--choco-cream)">
                    <strong>🌟 ZDP atingida:</strong> Proficiência confirmada nesta habilidade. Pronto para desafios algébricos.
                </div>`;
        }

        const corBorda = txAcerto >= 50 ? 'var(--neon-green)' : 'var(--neon-red)';
        
        // A OUTRA MUDANÇA ESTÁ AQUI: Lemos a descrição de hist.desc
        const descricaoDaHabilidade = hist.desc || "Habilidade da BNCC";

        c.innerHTML += `
            <div class="dash-card" style="border-left-color:${corBorda}">
                <h3 style="display:flex;justify-content:space-between;align-items:center;">
                    ${hab}
                    <span style="font-size:12px;color:var(--text-muted)">Desempenho: ${txAcerto}%</span>
                </h3>
                <p style="font-size:12px">${descricaoDaHabilidade}</p>

                <div style="margin-top:10px;font-size:12px;display:flex;justify-content:space-between;">
                    <span style="color:var(--neon-green)">✓ Acertos: ${acertos}</span>
                    <span style="color:var(--choco-gold)">⚠️ Sinal: ${errSinal}</span>
                    <span style="color:var(--neon-red)">✗ Cálculo: ${errCalc + errGeral}</span>
                </div>

                <div style="height:10px;margin-top:8px;display:flex;border-radius:8px;overflow:hidden;">
                    <div style="width:${txAcerto}%;background:var(--neon-green)" title="Acertos"></div>
                    <div style="width:${txErroSin}%;background:var(--choco-gold)" title="Erro de Sinal"></div>
                    <div style="width:${txErroCalc}%;background:var(--neon-red)" title="Erro de Cálculo"></div>
                </div>

                ${alerta}
            </div>`;
    }

    if (!temDados) {
        c.innerHTML = `
            <p style="font-size:13px;color:var(--text-muted);text-align:center;padding:20px;">
                Nenhum dado recolhido ainda. O estudante deve resolver os desafios para gerar a análise clínica.
            </p>`;
    }
}

/* ========================================================
   GAME OVER
======================================================== */
export function exibirGameOver() {
    const total = G.acertos + G.erros;
    const tx    = total > 0 ? Math.round((G.acertos / total) * 100) : 0;

    const goTxt   = document.getElementById("go-txt");
    const goSt    = document.getElementById("go-st");
    const goModal = document.getElementById("go");

    if (goTxt)   goTxt.innerHTML  = "O terminal entrou em modo de segurança. Mas a ciência constrói-se com o erro.";
    if (goSt)    goSt.textContent = `Acertos: ${G.acertos} | Falhas Resgatadas: ${G.erros} | Taxa Lógica: ${tx}%`;
    if (goModal) goModal.classList.add("show");

    narrarContexto(`Laboratório pausado. Taxa lógica de ${tx} por cento. Solicite a análise do Professor para ver os detalhes.`);
}
