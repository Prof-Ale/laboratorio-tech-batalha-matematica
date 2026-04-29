/**
 * main.js - Versão 5.0 "Laboratório Tech: Multiblocos"
 * Orquestrador com Persistência, Seletor de Blocos e Clínica do Erro.
 */

import { G } from './engine/gameState.js';
import { selQ, getSelectorDiag } from './engine/selector.js';
import { renderCv, animarArcos, setAnimando } from './game-engine.js';
import { 
    updHUD, 
    narrarContexto, 
    toggleMusica,
    toggleVoz,
    tocarAv, 
    abrirM, 
    fecharM, 
    exibirGameOver 
} from './ui-manager.js';

let qAtual = null;
 codex/check-project-functionality-and-structure
let inicioQuestaoMs = 0;
let sonsTorcidaAtivos = true;
=======
 codex/check-project-functionality-and-structure-olkyu6
let inicioQuestaoMs = 0;
let sonsTorcidaAtivos = true;
=======
 main
 main

/* ========================================================
   MODO BATALHA 7ºA vs 7ºB
======================================================== */
let scoreA = 0;
let scoreB = 0;
let turnoAtual = "A";
let rodadaAtual = 1;
codex/check-project-functionality-and-structure
let ultimaLideranca = null;
=======
 codex/check-project-functionality-and-structure-olkyu6
let ultimaLideranca = null;
=======
 main
 main

const PONTOS_POR_ACERTO = 10;
const META_VITORIA = 100;

function atualizarPlacar() {
    const elA = document.getElementById("scoreA");
    const elB = document.getElementById("scoreB");

    if (elA) elA.textContent = scoreA;
    if (elB) elB.textContent = scoreB;
codex/check-project-functionality-and-structure
=======
 codex/check-project-functionality-and-structure-olkyu6
main

    const board = document.getElementById("scoreboard-battle");
    if (board) {
        board.classList.remove("score-pulse");
        void board.offsetWidth;
        board.classList.add("score-pulse");
    }
codex/check-project-functionality-and-structure
=======
=======
 main
main
}

function atualizarMensagemTurno() {
    const fb = document.getElementById("fb");
    if (!fb) return;

    fb.style.color = "var(--neon-cyan)";
    fb.innerHTML = `
        ⚔️ <strong>Rodada ${rodadaAtual}</strong><br>
        <small>Vez do <strong>${turnoAtual === "A" ? "7ºA" : "7ºB"}</strong></small>
    `;
}

function pontuarEquipe() {
    let equipePontuada = turnoAtual;
 codex/check-project-functionality-and-structure
=======
codex/check-project-functionality-and-structure-olkyu6
main
    const pontos = calcularPontosDaRodada();

    if (turnoAtual === "A") {
        scoreA += pontos;
        turnoAtual = "B";
    } else {
        scoreB += pontos;
 codex/check-project-functionality-and-structure
=======
=======

    if (turnoAtual === "A") {
        scoreA += PONTOS_POR_ACERTO;
        turnoAtual = "B";
    } else {
        scoreB += PONTOS_POR_ACERTO;
 main
main
        turnoAtual = "A";
    }

    rodadaAtual++;
    atualizarPlacar();
codex/check-project-functionality-and-structure
=======
 codex/check-project-functionality-and-structure-olkyu6
main
    anunciarLideranca();
    verificarCampeao();

    return { equipePontuada, pontos };
}

function calcularPontosDaRodada() {
    const rodadaEspecial = rodadaAtual % 5 === 0;
    const desafioFinal = (scoreA >= 70 || scoreB >= 70);
    const comboBonus = Math.min((G.combo * 5), 10);
    const tempoResposta = Date.now() - inicioQuestaoMs;
    const bonusRelampago = tempoResposta <= 7000 ? 5 : 0;
    let pontos = PONTOS_POR_ACERTO + comboBonus;
    pontos += bonusRelampago;
    if (rodadaEspecial) pontos *= 2;
    if (desafioFinal) pontos = Math.max(pontos, 30);
    return pontos;
codex/check-project-functionality-and-structure
=======
=======
    verificarCampeao();

    return equipePontuada;
 main
 main
}

function alternarTurnoErro() {
    turnoAtual = turnoAtual === "A" ? "B" : "A";
    rodadaAtual++;
    atualizarPlacar();
}

function verificarCampeao() {
    if (scoreA >= META_VITORIA || scoreB >= META_VITORIA) {
        const vencedor = scoreA > scoreB ? "🏆 7ºA" : "🏆 7ºB";

        setTimeout(() => {
codex/check-project-functionality-and-structure
            mostrarTelaCampeao(`${vencedor} venceu a Batalha Matemática!`);
=======
 codex/check-project-functionality-and-structure-olkyu6
            mostrarTelaCampeao(`${vencedor} venceu a Batalha Matemática!`);
=======
            alert(`${vencedor} venceu a Batalha Matemática!`);
 main
main
        }, 300);
    }
}

 codex/check-project-functionality-and-structure
=======
codex/check-project-functionality-and-structure-olkyu6
main
function anunciarLideranca() {
    const fb = document.getElementById("fb");
    if (!fb) return;
    let estado = "empate";
    if (scoreA > scoreB) estado = "A";
    if (scoreB > scoreA) estado = "B";
    if (estado === ultimaLideranca) return;
    ultimaLideranca = estado;

    if (estado === "A") fb.innerHTML += `<br><strong>🔥 7ºA assumiu a liderança!</strong>`;
    else if (estado === "B") fb.innerHTML += `<br><strong>⚡ 7ºB virou o jogo!</strong>`;
    else fb.innerHTML += `<br><strong>🤝 Empate total na batalha!</strong>`;
}

function mostrarTelaCampeao(texto) {
    const go = document.getElementById("go");
    const goTxt = document.getElementById("go-txt");
    if (goTxt) goTxt.textContent = texto;
    if (go) go.classList.add("show");
    mostrarFogos();
    tocarSomVitoria();
}

function tocarSomVitoria() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = 880;
        gain.gain.value = 0.04;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
    } catch (_) {}
}

function tocarTorcida() {
    if (!sonsTorcidaAtivos) return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.value = 320;
        gain.gain.value = 0.02;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch (_) {}
}

function mostrarFogos() {
    const jaExiste = document.getElementById("fx-fogos");
    if (jaExiste) jaExiste.remove();
    const fx = document.createElement("div");
    fx.id = "fx-fogos";
    fx.innerHTML = `<span>✨</span><span>🎉</span><span>✨</span><span>🎊</span><span>✨</span>`;
    document.body.appendChild(fx);
    setTimeout(() => fx.remove(), 2600);
}

codex/check-project-functionality-and-structure
=======
=======
main
main
function resetarBatalha() {
    scoreA = 0;
    scoreB = 0;
    turnoAtual = "A";
    rodadaAtual = 1;
    atualizarPlacar();
}

/* ========================================================
   PERSISTÊNCIA DE DADOS (LOCALSTORAGE)
======================================================== */
function carregarDadosSalvos() {
 codex/check-project-functionality-and-structure
    try {
        const backup = localStorage.getItem('laboratorio_tech_data');
        if (backup) {
            const dados = JSON.parse(backup);
            G.historico = dados.historico || {};
            G.nome = dados.nome || "";
        }
    } catch (e) {
        console.warn("LocalStorage indisponível, seguindo sem persistência.", e);
=======
    const backup = localStorage.getItem('laboratorio_tech_data');
    if (backup) {
        try {
            const dados = JSON.parse(backup);
            G.historico = dados.historico || {};
            G.nome = dados.nome || "";
        } catch (e) {
            console.error("Erro ao recuperar banco de dados local", e);
        }
 main
    }
}

function salvarProgresso() {
codex/check-project-functionality-and-structure
    try {
        const dataToSave = {
            historico: G.historico,
            nome: G.nome
        };
        localStorage.setItem('laboratorio_tech_data', JSON.stringify(dataToSave));
    } catch (e) {
        // Ambiente sem storage (modo privado / bloqueio) não deve travar o jogo.
    }
=======
    const dataToSave = {
        historico: G.historico,
        nome: G.nome
    };
    localStorage.setItem('laboratorio_tech_data', JSON.stringify(dataToSave));
main
}

carregarDadosSalvos();

/* ========================================================
   NAVEGAÇÃO E FLUXO DO USUÁRIO
======================================================== */

window.mostrarSeletorBlocos = function() {
    const inputNome = document.getElementById("nome-cientista");
    G.nome = (inputNome && inputNome.value.trim() !== "") ? inputNome.value.trim() : "Cientista";
    
    document.getElementById("splash-screen").classList.add("hidden");
    document.getElementById("block-selector").classList.remove("hidden");
    
    narrarContexto(`Olá ${G.nome}, escolha qual setor do laboratório vamos restaurar hoje.`);
}

window.iniciarBloco = function(id) {
    const blockNames = {
        1: "Base Numérica",
        2: "Operações",
        3: "Medidas",
        4: "Álgebra",
        5: "Estatística"
    };

    G.currentBlock = id;
    G.vida = 100;
    G.energia = 60;
    G.combo = 0;
    G.nivel = 1;

    resetarBatalha();

    document.getElementById("block-selector").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    document.getElementById("av").classList.remove("hidden");
    document.getElementById("nome-bloco-display").textContent = blockNames[id];
    
    const bgm = document.getElementById("bgm");
    if (bgm) { 
        bgm.volume = 0.07; 
        if (G.musica) bgm.play().catch(() => {}); 
    }
    
    narrarContexto(`Iniciando Bloco ${id}: ${blockNames[id]}. Sistema de diagnóstico ativado.`);
    updHUD();
    proximaQ();
}

window.irParaSeletor = function() {
    setAnimando(false);
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("go").classList.remove("show");
    document.getElementById("av").classList.add("hidden");
    document.getElementById("block-selector").classList.remove("hidden");
}

window.voltarAoSplash = function() {
    document.getElementById("block-selector").classList.add("hidden");
    document.getElementById("splash-screen").classList.remove("hidden");
}

/* ========================================================
   MOTOR DE QUESTÕES E CLÍNICA DO ERRO
======================================================== */

function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}


function atualizarDiagnostico() {
    const box = document.getElementById('diag-status');
    if (!box) return;

    const d = getSelectorDiag();
    box.innerHTML = `
        <strong>Diagnóstico</strong><br>
        Bloco solicitado: ${d.blocoSolicitado} • Bloco usado: ${d.blocoUsado}<br>
        Pool total: ${d.poolTotal} • Disponíveis no bloco: ${d.disponiveisBloco}<br>
        Fallback global: ${d.fallbackGlobal ? 'SIM' : 'NÃO'}
    `;
}

function renderQ(q) {
    if (!q) return;

    document.getElementById("conta-display").innerHTML = "<span>" + q.display + "</span>";
    document.getElementById("regra-box").innerHTML = q.dica || "";
    document.getElementById("btn-prox").classList.add("hidden");

    G.respondeu = false;
    setAnimando(false);
    renderCv(q);

    atualizarMensagemTurno();
    atualizarDiagnostico();
codex/check-project-functionality-and-structure
    inicioQuestaoMs = Date.now();
=======
 codex/check-project-functionality-and-structure-olkyu6
    inicioQuestaoMs = Date.now();
=======
main
 main

    const g = document.getElementById("grid-botoes");
    g.innerHTML = "";

    const botoesEmbaralhados = shuffle([...q.botoes]); 

    g.style.gridTemplateColumns = botoesEmbaralhados.length <= 3
        ? `repeat(${botoesEmbaralhados.length}, 1fr)`
        : "1fr 1fr";

    botoesEmbaralhados.forEach(op => {
        const b = document.createElement("button");
        b.className = "ba";
        b.textContent = op;
        b.onclick = () => { if (!G.respondeu) responder(op, q); };
        g.appendChild(b);
    });
}

function responder(opcao, q) {
    if (G.respondeu) return;
    G.respondeu = true;

    let ok = Array.isArray(q.res) 
        ? q.res.map(String).includes(String(opcao)) 
        : (String(opcao) === String(q.res));
    
    if (q.bncc && !G.historico[q.bncc]) {
        G.historico[q.bncc] = { 
            desc: q.bncc_desc || "Habilidade BNCC", 
            acertos: 0, 
            erros_sinal: 0, 
            erros_calculo: 0,
            bloco: G.currentBlock 
        };
    }

    document.querySelectorAll(".ba").forEach(b => {
        b.classList.add("dis"); 
        const isCorreta = Array.isArray(q.res)
            ? q.res.map(String).includes(b.textContent)
            : b.textContent === String(q.res);

        if (isCorreta) b.classList.add("ok");
        if (b.textContent === String(opcao) && !ok) b.classList.add("no");
    });
    
    const fb = document.getElementById("fb");
    
    if (ok) {
        processarAcerto(q, fb);
    } else {
        processarErro(opcao, q, fb);
    }
    
    salvarProgresso();
    updHUD();

    if (q.tipo === "reta") animarArcos(q);
    
    document.getElementById("btn-prox").classList.remove("hidden");

    if (G.vida <= 0) setTimeout(exibirGameOver, 1400);
}

function processarAcerto(q, fbEl) {
    G.acertos++;
    G.combo++;
    G.consec_erros = 0; 
    G.energia = Math.min(100, G.energia + 10);

    if (G.combo % 5 === 0) G.nivel++;
    if (q.bncc) G.historico[q.bncc].acertos++;

codex/check-project-functionality-and-structure
    const { equipePontuada, pontos } = pontuarEquipe();
=======
codex/check-project-functionality-and-structure-olkyu6
    const { equipePontuada, pontos } = pontuarEquipe();
=======
    const equipePontuada = pontuarEquipe();
main
main
    
    const elogios = ["Excelente", "Muito bem", "Fabuloso", "Na mosca", "Perfeito"];
    const elogio = elogios[Math.floor(Math.random() * elogios.length)];
    
    fbEl.style.color = "var(--neon-green)";
    fbEl.innerHTML = `
        ✓ ${elogio}!<br>
        <small>${q.passo}</small><br>
codex/check-project-functionality-and-structure
        <strong>+${pontos} pontos para ${equipePontuada === "A" ? "7ºA" : "7ºB"}</strong>
    `;
    tocarTorcida();
=======
codex/check-project-functionality-and-structure-olkyu6
        <strong>+${pontos} pontos para ${equipePontuada === "A" ? "7ºA" : "7ºB"}</strong>
    `;
    tocarTorcida();
=======
        <strong>+10 pontos para ${equipePontuada === "A" ? "7ºA" : "7ºB"}</strong>
    `;
main
 main

    narrarContexto(`${elogio}! ${q.passo}`);
    tocarAv("ok");
}

function processarErro(opcao, q, fbEl) {
    G.erros++;
    G.combo = 0;
    G.consec_erros++; 
    G.vida = Math.max(0, G.vida - 20); 
    
    let erroDeSinal = false;
    let resEsperada = Array.isArray(q.res) ? Number(q.res[0]) : Number(q.res);

    if (!isNaN(opcao) && Number(opcao) === (resEsperada * -1)) {
        erroDeSinal = true;
    }

    if (erroDeSinal) {
        if (q.bncc) G.historico[q.bncc].erros_sinal++;
        fbEl.innerHTML = `⚠️ Cuidado com o sentido (sinal)!`;
    } else {
        if (q.bncc) G.historico[q.bncc].erros_calculo++;
        fbEl.innerHTML = `⚠️ A resposta correta era ${Array.isArray(q.res) ? q.res[0] : q.res}.`;
    }
    
    fbEl.style.color = "var(--choco-gold)";
    alternarTurnoErro();

    narrarContexto(fbEl.innerText);
    tocarAv("no");
}

window.proximaQ = function() {
    setAnimando(false);
    qAtual = selQ(G.currentBlock);
    renderQ(qAtual);
}

/* ========================================================
   RELATÓRIOS E FERRAMENTAS DO PROFESSOR
======================================================== */
window.exportarRelatorioCSV = function() {
    let csv = "Bloco;Codigo_BNCC;Descricao;Acertos;Erros_Sinal;Erros_Calculo\n";
    
    for (let cod in G.historico) {
        let h = G.historico[cod];
        let descLimpa = h.desc.replace(/;/g, ',');
        csv += `${h.bloco || '?'};${cod};${descLimpa};${h.acertos};${h.erros_sinal};${h.erros_calculo}\n`;
    }

    const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Relatorio_LabTech_${G.nome.replace(/\s/g, '_')}.csv`;
    link.click();
}

window.verPerfilAluno = function() {
    let patente = G.nivel > 5 ? "Cientista Master" : "Explorador";
    narrarContexto(`${G.nome}, sua patente atual é ${patente}.`);
    alert(`Cientista: ${G.nome}\nPatente: ${patente}\nAcertos: ${G.acertos}`);
}

window.reiniciar = function() {
    G.vida = 100;
    G.energia = 60;
    G.combo = 0;

    resetarBatalha();

    document.getElementById("go").classList.remove("show");
    updHUD(); 
    proximaQ();
}

/* ========================================================
   DUA - ACESSIBILIDADE DE TECLADO
======================================================== */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const atv = document.activeElement;
        if (atv && atv.tagName === 'BUTTON') {
            atv.click();
            e.preventDefault();
        }
    }
 codex/check-project-functionality-and-structure
=======
codex/check-project-functionality-and-structure-olkyu6
 main

    if (e.key.toLowerCase() === 't') {
        sonsTorcidaAtivos = !sonsTorcidaAtivos;
        const fb = document.getElementById("fb");
        if (fb) fb.innerHTML = `🔊 Torcida ${sonsTorcidaAtivos ? "ATIVADA" : "DESATIVADA"}`;
    }
codex/check-project-functionality-and-structure
=======
=======
 main
 main
});
