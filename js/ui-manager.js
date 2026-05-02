/**
 * js/ui-manager.js - v6.1
 * Interface, Áudio, Avatar, Dashboard BNCC e exportação CSV.
 * Compatível com a estrutura real de assets do projeto.
 */

import { G, salvarProgresso } from './engine/gameState.js';

const bgm = document.getElementById('bgm');

// Pré-carrega vozes do navegador (DUA)
if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

/* ═══════════════════════════════════════════
   ÁUDIO: SFX + BGM + TTS
═══════════════════════════════════════════ */

export function tocarSFX(tipo) {
    try {
        const sfx = new Audio(`./assets/audio/${tipo}.mp3`);
        sfx.volume = 0.45;
        sfx.play().catch(() => {});
    } catch (e) {}
}

export function toggleMusica() {
    G.musica = !G.musica;
    const el = document.getElementById('tsom');
    if (el) el.textContent = G.musica ? 'ON' : 'OFF';

    if (G.musica && bgm) {
        bgm.volume = 0.07;
        bgm.play().catch(() => {});
    } else if (bgm) {
        bgm.pause();
    }
}

export function toggleVoz() {
    G.voz = !G.voz;
    const el = document.getElementById('tvoz');
    if (el) el.textContent = G.voz ? 'ON' : 'OFF';
    if (!G.voz && window.speechSynthesis) window.speechSynthesis.cancel();
}

export function falarAda(texto) {
    try {
        if (!G.voz || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();

        const limpo = String(texto).replace(/<[^>]*>/gm, '');
        const u = new SpeechSynthesisUtterance(limpo);
        const vozes = window.speechSynthesis.getVoices();
        const vozBR = vozes.find(v => v.lang.includes('pt-BR')) || vozes[0];

        u.voice = vozBR;
        u.lang  = 'pt-BR';
        u.rate  = 0.93;
        u.pitch = 0.9;

        // Ducking do BGM durante a narração
        u.onstart = () => { if (bgm && G.musica) bgm.volume = 0.02; };
        u.onend   = () => { if (bgm && G.musica) bgm.volume = 0.07; };
        u.onerror = () => { if (bgm && G.musica) bgm.volume = 0.07; };

        window.speechSynthesis.speak(u);
    } catch (e) {
        console.warn('TTS indisponível:', e);
    }
}

/* ═══════════════════════════════════════════
   HUD E FEEDBACK
═══════════════════════════════════════════ */

export function renderHUD(acerto, passo = '', pontos = 0, turma = null) {
    const fb  = document.getElementById('fb');
    const btn = document.getElementById('btn-prox');

    // Atualiza contadores
    document.getElementById('tcb').textContent = G.combo;
    const tnv = document.getElementById('tnv');
    if (tnv) tnv.textContent = G.nivel;

    if (acerto === null) {
        // Limpa feedback (nova questão)
        if (fb) { fb.innerHTML = ''; fb.style.color = ''; }
        if (btn) btn.classList.add('hidden');
        return;
    }

    // Feedback de acerto ou erro
    if (fb) {
        if (acerto) {
            const elogios = ['Excelente!', 'Perfeito!', 'Na mosca!', 'Muito bem!', 'Fabuloso!'];
            const elogio = elogios[Math.floor(Math.random() * elogios.length)];
            const label  = turma ? ` +${pontos} pts para 7º${turma}` : '';
            fb.style.color = 'var(--neon-green)';
            fb.innerHTML   = `
                <div style="font-weight:900;">✔️ ${elogio}${label}</div>
                <div style="font-size:0.88rem;margin-top:4px;">${passo}</div>
            `;
        } else {
            fb.style.color = 'var(--neon-red)';
            fb.innerHTML   = `
                <div style="font-weight:900;">❌ Resposta errada. Vez do outro time!</div>
                <div style="font-size:0.88rem;margin-top:4px;">${passo}</div>
            `;
        }
    }

    if (btn) btn.classList.remove('hidden');

    if (G.voz) falarAda(acerto ? passo : 'Resposta errada. ' + passo);
}

/* ═══════════════════════════════════════════
   AVATAR
═══════════════════════════════════════════ */

export function atualizarAvatar(status) {
    const img   = document.getElementById('av-img');
    const vidOk = document.getElementById('vid-ok');
    const vidNo = document.getElementById('vid-no');

    if (!img) return;

    [img, vidOk, vidNo].forEach(el => el && el.classList.add('avh'));

    const target = status === 'ok' ? vidOk : vidNo;
    if (!target) {
        img.classList.remove('avh');
        return;
    }

    target.classList.remove('avh');
    target.currentTime = 0;
    target.play().catch(() => img.classList.remove('avh'));

    target.onended = () => {
        target.classList.add('avh');
        img.classList.remove('avh');
    };
}

/* ═══════════════════════════════════════════
   MODAIS (Dashboard + Créditos)
═══════════════════════════════════════════ */

export function mostrarModal(id, abrir) {
    const modal = document.getElementById(id);
    if (!modal) return;

    if (abrir) {
        modal.classList.add('show');
        if (id === 'mdash') gerarDashboard();
    } else {
        modal.classList.remove('show');
    }
}

function gerarDashboard() {
    const container = document.getElementById('dash-content');
    if (!container) return;
    container.innerHTML = '';

    const chaves = Object.keys(G.historico);
    if (chaves.length === 0) {
        container.innerHTML = "<p style='text-align:center;color:#888;'>Nenhum dado coletado ainda.<br>Inicie uma batalha para ver o relatório.</p>";
        return;
    }

    chaves.forEach(hab => {
        const h = G.historico[hab];
        const total = h.acertos + h.erros_sinal + h.erros_calculo;
        if (total === 0) return;

        const pctAcerto = Math.round((h.acertos / total) * 100);

        let alerta = '';
        if (h.erros_sinal > h.erros_calculo) {
            alerta = `<div class="alerta">⚠️ <b>Barreira de Sinal:</b> Sabe calcular, mas erra o sinal. Reforce a reta numérica.</div>`;
        } else if (h.erros_calculo > h.erros_sinal) {
            alerta = `<div class="alerta" style="border-color:var(--neon-red)">🚨 <b>Barreira de Cálculo:</b> Entende o conceito mas precisa reforçar a aritmética básica.</div>`;
        } else if (pctAcerto >= 75) {
            alerta = `<div class="alerta" style="border-color:var(--neon-green)">🌟 <b>ZDP atingida:</b> Proficiência confirmada. Pronto para avançar.</div>`;
        }

        container.innerHTML += `
            <div class="dash-card">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <strong style="color:var(--choco-gold);">${hab}</strong>
                    <span>${pctAcerto}% de acerto</span>
                </div>
                <div style="font-size:0.78rem;margin:4px 0;color:#aaa;">${h.desc || ''} — Bloco ${h.bloco}</div>
                <div class="dash-bar">
                    <div class="dash-fill-ok" style="width:${pctAcerto}%"></div>
                    <div class="dash-fill-no" style="width:${100 - pctAcerto}%"></div>
                </div>
                ${alerta}
            </div>
        `;
    });
}

/* ═══════════════════════════════════════════
   EXPORTAÇÃO CSV
═══════════════════════════════════════════ */

export function exportarCSV() {
    let csv = 'Bloco;Codigo_BNCC;Descricao;Acertos;Erros_Sinal;Erros_Calculo\n';
    for (const cod in G.historico) {
        const h = G.historico[cod];
        const desc = (h.desc || '').replace(/;/g, ',');
        csv += `${h.bloco};${cod};${desc};${h.acertos};${h.erros_sinal};${h.erros_calculo}\n`;
    }
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href     = url;
    link.download = `LabTech_${G.nome}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
}
