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

/* ========================================================
   MODO BATALHA 7ºA vs 7ºB
======================================================== */
let scoreA = 0;
let scoreB = 0;
let turnoAtual = "A";
let rodadaAtual = 1;
let ultimaLideranca = null;

const PONTOS_POR_ACERTO = 10;
const META_VITORIA = 100;

function atualizarPlacar() {
    const elA = document.getElementById("scoreA");
    const elB = document.getElementById("scoreB");

    if (elA) elA.textContent = scoreA;
    if (elB) elB.textContent = scoreB;

    const board = document.getElementById("scoreboard-battle");
    if (board) {
        board.classList.remove("score-pulse");
        void board.offsetWidth;
        board.classList.add("score-pulse");
    }
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
    const pontos = calcularPontosDaRodada();

    if (turnoAtual === "A") {
        scoreA += pontos;
        turnoAtual = "B";
    } else {
        scoreB += pontos;
        turnoAtual = "A";
    }

    rodadaAtual++;
    atualizarPlacar();
    anunciarLideranca();
    verificarCampeao();

    return { equipePontuada, pontos };
}

function calcularPontosDaRodada() {
    const rodadaEspecial = rodadaAtual % 5 === 0;
    const desafioFinal = (scoreA >= 70 || scoreB >= 70);
    const comboBonus = Math.min((G.combo * 5), 10);
    let pontos = PONTOS_POR_ACERTO + comboBonus;
    if (rodadaEspecial) pontos *= 2;
    if (desafioFinal) pontos = Math.max(pontos, 30);
    return pontos;
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
            mostrarTelaCampeao(`${vencedor} venceu a Batalha Matemática!`);
        }, 300);
    }
}

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
    const backup = localStorage.getItem('laboratorio_tech_data');
    if (backup) {
        try {
            const dados = JSON.parse(backup);
            G.historico = dados.historico || {};
            G.nome = dados.nome || "";
        } catch (e) {
            console.error("Erro ao recuperar banco de dados local", e);
        }
    }
}

function salvarProgresso() {
    const dataToSave = {
        historico: G.historico,
        nome: G.nome
    };
    localStorage.setItem('laboratorio_tech_data', JSON.stringify(dataToSave));
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

    const { equipePontuada, pontos } = pontuarEquipe();
    
    const elogios = ["Excelente", "Muito bem", "Fabuloso", "Na mosca", "Perfeito"];
    const elogio = elogios[Math.floor(Math.random() * elogios.length)];
    
    fbEl.style.color = "var(--neon-green)";
    fbEl.innerHTML = `
        ✓ ${elogio}!<br>
        <small>${q.passo}</small><br>
        <strong>+${pontos} pontos para ${equipePontuada === "A" ? "7ºA" : "7ºB"}</strong>
    `;

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
});
