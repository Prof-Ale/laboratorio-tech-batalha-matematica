// js/game-engine.js
// Motor de Renderização do Canvas e Animações

let animState = 0;
let isAnimating = false;
let currentQ = null;
let animId = null;

export function setAnimando(val) {
    isAnimating = val;
    if (!val) {
        animState = 0;
        if (animId) cancelAnimationFrame(animId);
    }
}

export function animarArcos(q) {
    if (q.tipo !== "reta") return;
    currentQ = q;
    isAnimating = true;
    animState = 0;
    loopAnimacao();
}

function loopAnimacao() {
    if (!isAnimating) return;
    
    animState += 0.03; // Velocidade do salto
    
    if (animState >= 1) {
        animState = 1;
        isAnimating = false;
    }
    
    renderCv(currentQ);
    
    if (isAnimating) {
        animId = requestAnimationFrame(loopAnimacao);
    }
}

export function renderCv(q) {
    const cv = document.getElementById("canvas-game");
    if (!cv) return;
    const ctx = cv.getContext("2d");

    // --- A SUA CORREÇÃO DE DPI AQUI! ---
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = 580;
    const cssHeight = 130;
    
    cv.width = cssWidth * dpr;
    cv.height = cssHeight * dpr;
    cv.style.width = cssWidth + "px";
    cv.style.height = cssHeight + "px";
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Reseta e aplica o scale
    // -----------------------------------

    // Limpa o canvas
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // Esconde as regras de sinais se for a Trilha 1 (reta)
    const imgRegras = document.getElementById("img-regras");
    if (imgRegras) {
        imgRegras.style.display = q.tipo === "sinais" ? "block" : "none";
    }

    if (q.tipo === "reta") {
        desenharReta(ctx, cssWidth, cssHeight);
        
        // Se já respondeu e tem parâmetros A e B, desenha o arco animado
        if (q.a !== undefined && q.b !== undefined && (isAnimating || animState > 0)) {
            desenharArco(ctx, cssWidth, cssHeight, q.a, q.b, animState);
        } else if (q.a !== undefined) {
            // Se ainda não respondeu, desenha apenas a bolinha no ponto de partida
            desenharPontoPartida(ctx, cssWidth, cssHeight, q.a);
        }
    } else {
        // Se não for reta numérica, desenha um fundo sutil (opcional)
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.textAlign = "center";
        ctx.font = "italic 14px Nunito";
        ctx.fillText("Análise Lógica Ativada", cssWidth / 2, cssHeight / 2);
    }
}

/* ========================================================
   FUNÇÕES DE DESENHO GEOMÉTRICO (ATUALIZADAS COM CORES HEX)
======================================================== */

function getX(val, width) {
    const min = -10;
    const max = 10;
    const margem = 30; 
    const areaUtil = width - (margem * 2);
    const passo = areaUtil / (max - min);
    return margem + ((val - min) * passo);
}

function desenharReta(ctx, w, h) {
    const yCenter = h - 30; 

    ctx.beginPath();
    ctx.moveTo(10, yCenter);
    ctx.lineTo(w - 10, yCenter);
    ctx.strokeStyle = "rgba(212, 160, 23, 0.6)"; 
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "bold 12px Nunito";

    for (let i = -10; i <= 10; i++) {
        const x = getX(i, w);
        
        ctx.beginPath();
        ctx.moveTo(x, yCenter - 5);
        ctx.lineTo(x, yCenter + 5);
        // Usando o código HEX do Ciano direto aqui!
        ctx.strokeStyle = i === 0 ? "#00e5ff" : "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = i === 0 ? 3 : 2;
        ctx.stroke();

        ctx.fillStyle = i === 0 ? "#00e5ff" : "rgba(255, 255, 255, 0.7)";
        if (i % 2 === 0 || i === 5 || i === -5) {
            ctx.fillText(i, x, yCenter + 10);
        }
    }
}

function desenharPontoPartida(ctx, w, h, a) {
    const startX = getX(a, w);
    const yCenter = h - 30;

    ctx.beginPath();
    ctx.arc(startX, yCenter, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#00e5ff"; // Ciano puro (Garante que o navegador não esconde)
    ctx.fill();
    
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00e5ff";
    // Tira a sombra para o resto do canvas não bugar
    ctx.shadowBlur = 0; 
}

function desenharArco(ctx, w, h, a, b, progresso) {
    const startX = getX(a, w);
    const endX = getX(a + b, w);
    const yCenter = h - 30;
    const alturaArco = 50; 

    // Se o valor de b for positivo, é Verde. Se for negativo, é Vermelho!
    const corArco = b > 0 ? "#00ff88" : "#ff4444";

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(startX, yCenter);

    for (let t = 0; t <= progresso; t += 0.02) {
        let cx = startX + (endX - startX) * t;
        let cy = yCenter - alturaArco * (1 - Math.pow(2 * t - 1, 2));
        ctx.lineTo(cx, cy);
    }

    ctx.strokeStyle = corArco;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.setLineDash([5, 5]); 
    ctx.stroke();

    let atualX = startX + (endX - startX) * progresso;
    let atualY = yCenter - alturaArco * (1 - Math.pow(2 * progresso - 1, 2));

    ctx.beginPath();
    ctx.arc(atualX, atualY, 6, 0, Math.PI * 2);
    ctx.fillStyle = corArco;
    ctx.fill();

    ctx.restore();
}
