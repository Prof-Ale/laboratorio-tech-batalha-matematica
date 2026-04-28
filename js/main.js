/**
 * main.js - Versão 5.0 "Laboratório Tech: Multiblocos"
 * Orquestrador com Persistência, Seletor de Blocos e Clínica do Erro.
 */

import { G } from './engine/gameState.js';
import { selQ } from './engine/selector.js'; // Note: O selector agora filtrará por G.currentBlock
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

/**
 * Passo 1: Do Splash para o Seletor de Blocos
 */
window.mostrarSeletorBlocos = function() {
    const inputNome = document.getElementById("nome-cientista");
    G.nome = (inputNome && inputNome.value.trim() !== "") ? inputNome.value.trim() : "Cientista";
    
    document.getElementById("splash-screen").classList.add("hidden");
    document.getElementById("block-selector").classList.remove("hidden");
    
    narrarContexto(`Olá ${G.nome}, escolha qual setor do laboratório vamos restaurar hoje.`);
}

/**
 * Passo 2: Iniciar o Bloco selecionado
 */
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

    // UI Updates
    document.getElementById("block-selector").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    document.getElementById("av").classList.remove("hidden");
    document.getElementById("nome-bloco-display").textContent = blockNames[id];
    
    // Música
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

// Função auxiliar para embaralhar arrays (Fisher-Yates)
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

function renderQ(q) {
    if (!q) return;

    document.getElementById("conta-display").innerHTML = "<span>" + q.display + "</span>";
    document.getElementById("regra-box").innerHTML = q.dica || "";
    document.getElementById("fb").textContent = "";
    document.getElementById("btn-prox").classList.add("hidden");

    G.respondeu = false;
    setAnimando(false);
    renderCv(q);

    const g = document.getElementById("grid-botoes");
    g.innerHTML = "";

    // --- O PULO DO GATO ---
    // Criamos uma cópia dos botões para não alterar o banco de dados original
    const botoesEmbaralhados = shuffle([...q.botoes]); 

    g.style.gridTemplateColumns = botoesEmbaralhados.length <= 3 ? `repeat(${botoesEmbaralhados.length}, 1fr)` : "1fr 1fr";

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

    // Validação de Múltiplas Respostas Corretas
    let ok = Array.isArray(q.res) 
        ? q.res.map(String).includes(String(opcao)) 
        : (String(opcao) === String(q.res));
    
    // Inicializa histórico BNCC se não existir
    if (q.bncc && !G.historico[q.bncc]) {
        G.historico[q.bncc] = { 
            desc: q.bncc_desc || "Habilidade BNCC", 
            acertos: 0, 
            erros_sinal: 0, 
            erros_calculo: 0,
            bloco: G.currentBlock 
        };
    }

    // Feedback Visual nos Botões
    document.querySelectorAll(".ba").forEach(b => {
        b.classList.add("dis"); 
        const isCorreta = Array.isArray(q.res) ? q.res.map(String).includes(b.textContent) : b.textContent === String(q.res);
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
    G.acertos++; G.combo++; G.consec_erros = 0; 
    G.energia = Math.min(100, G.energia + 10);
    if (G.combo % 5 === 0) G.nivel++;
    if (q.bncc) G.historico[q.bncc].acertos++;
    
    const elogios = ["Excelente", "Muito bem", "Fabuloso", "Na mosca", "Perfeito"];
    const elogio = elogios[Math.floor(Math.random() * elogios.length)];
    
    fbEl.style.color = "var(--neon-green)";
    fbEl.innerHTML = `✓ ${elogio}! <br><small>${q.passo}</small>`;
    narrarContexto(`${elogio}! ${q.passo}`);
    tocarAv("ok");
}

function processarErro(opcao, q, fbEl) {
    G.erros++; G.combo = 0; G.consec_erros++; 
    G.vida = Math.max(0, G.vida - 20); 
    
    // Clínica do Erro: Diferencia sinal de cálculo
    let erroDeSinal = false;
    let resEsperada = Array.isArray(q.res) ? Number(q.res[0]) : Number(q.res);
    if (!isNaN(opcao) && Number(opcao) === (resEsperada * -1)) erroDeSinal = true;

    if (erroDeSinal) {
        if (q.bncc) G.historico[q.bncc].erros_sinal++;
        fbEl.innerHTML = `⚠️ Cuidado com o sentido (sinal)! O valor absoluto está correto.`;
    } else {
        if (q.bncc) G.historico[q.bncc].erros_calculo++;
        fbEl.innerHTML = `⚠️ Houve um desvio no cálculo. A resposta era ${Array.isArray(q.res) ? q.res[0] : q.res}.`;
    }
    
    fbEl.style.color = "var(--choco-gold)";
    narrarContexto(fbEl.innerText);
    tocarAv("no");
}

window.proximaQ = function() {
    setAnimando(false);
    qAtual = selQ(G.currentBlock); // O seletor agora recebe o bloco ativo
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
    G.vida = 100; G.energia = 60; G.combo = 0;
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
