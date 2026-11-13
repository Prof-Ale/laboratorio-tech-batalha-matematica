/** Áudio: efeitos, música de fundo e leitura em voz alta (DUA). */
const estado = { musica: true, voz: true };
const bgm = document.getElementById('bgm');
const cache = {};
let faixa = 'bgm_base';

if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();

export const audioEstado = estado;

export function sfx(nome) {
    try {
        const a = cache[nome] || (cache[nome] = new Audio(`assets/audio/${nome}.mp3`));
        a.volume = 0.45;
        a.currentTime = 0;
        a.play().catch(() => {});
    } catch (e) { /* sem som */ }
}

export function tocarMusica(nome = faixa) {
    if (!bgm) return;
    if (nome !== faixa) {
        faixa = nome;
        bgm.src = `assets/audio/${nome}.mp3`;
    }
    bgm.volume = 0.08;
    if (estado.musica) bgm.play().catch(() => {});
}

export function pararMusica() { if (bgm) bgm.pause(); }

export function alternarMusica() {
    estado.musica = !estado.musica;
    if (estado.musica) tocarMusica(); else pararMusica();
    return estado.musica;
}

export function alternarVoz() {
    estado.voz = !estado.voz;
    if (!estado.voz && window.speechSynthesis) window.speechSynthesis.cancel();
    return estado.voz;
}

export function falar(texto) {
    try {
        if (!estado.voz || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(String(texto).replace(/−/g, ' menos ').replace(/\^/g, ' elevado a ').replace(/\s+/g, ' '));
        const vozes = window.speechSynthesis.getVoices();
        u.voice = vozes.find(v => v.lang && v.lang.includes('pt-BR')) || vozes[0] || null;
        u.lang = 'pt-BR';
        u.rate = 0.93;
        u.onstart = () => { if (bgm && estado.musica) bgm.volume = 0.02; };
        u.onend = u.onerror = () => { if (bgm && estado.musica) bgm.volume = 0.08; };
        window.speechSynthesis.speak(u);
    } catch (e) { /* voz indisponível */ }
}

export function calarVoz() { if (window.speechSynthesis) window.speechSynthesis.cancel(); }
