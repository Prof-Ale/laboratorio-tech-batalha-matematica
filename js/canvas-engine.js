/**
 * js/canvas-engine.js - Motor de Salto Animado
 * Especialista: Visualização Concreta de Inteiros.
 */

export function animarSalto(valorInicial, valorFinal, acerto) {
    const canvas = document.getElementById('canvas-game');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const centroY = 80;
    const zeroX = canvas.width / 2;
    const escala = 25; // Pixels por unidade
    
    let progresso = 0; // Vai de 0 a 1
    const velocidade = 0.02; // Ajuste para mais rápido ou lento

    function loop() {
        progresso += velocidade;
        if (progresso > 1) progresso = 1;

        // 1. Limpa o Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. Desenha a Reta Estática (Fundo)
        desenharRetaBase(ctx, canvas, centroY, zeroX, escala);

        // 3. Cálculo do Salto Animado
        const xInicio = zeroX + (valorInicial * escala);
        const xFim = zeroX + (valorFinal * escala);
        const xAtual = xInicio + (xFim - xInicio) * progresso;
        
        // Altura do arco (Vértice da parábola)
        const alturaMax = 50;
        const yAtual = centroY - Math.sin(progresso * Math.PI) * alturaMax;

        // 4. Desenha o Arco (Curva de Bézier Quadrática)
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = acerto ? '#39ff14' : '#ff3131'; // Neon Green ou Neon Red
        ctx.lineWidth = 3;

        // Ponto de controle dinâmico para o efeito de "crescimento"
        const cpX = (xInicio + xAtual) / 2;
        const cpY = centroY - (Math.sin(progresso * Math.PI) * (alturaMax * 2));

        ctx.moveTo(xInicio, centroY);
        ctx.quadraticCurveTo(cpX, cpY, xAtual, yAtual);
        ctx.stroke();
        ctx.setLineDash([]);

        // 5. Desenha a "Cabeça da Seta" no ponto atual
        desenharSeta(ctx, xAtual, yAtual, valorFinal > valorInicial);

        if (progresso < 1) {
            requestAnimationFrame(loop);
        }
    }

    requestAnimationFrame(loop);
}

function desenharRetaBase(ctx, canvas, centroY, zeroX, escala) {
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, centroY);
    ctx.lineTo(canvas.width - 10, centroY);
    ctx.stroke();

    for (let i = -10; i <= 10; i++) {
        const x = zeroX + (i * escala);
        ctx.fillStyle = i === 0 ? '#ff3131' : '#888';
        ctx.font = "12px Orbitron";
        ctx.fillText(i, x - 5, centroY + 25);
        
        ctx.beginPath();
        ctx.moveTo(x, centroY - 5);
        ctx.lineTo(x, centroY + 5);
        ctx.stroke();
    }
}

function desenharSeta(ctx, x, y, paraDireita) {
    ctx.fillStyle = ctx.strokeStyle;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
}
