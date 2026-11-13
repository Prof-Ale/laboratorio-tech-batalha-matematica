/** Reta numérica para as questões de soma e subtração de inteiros do banco do evento. */

const RE = /^\(?\s*([−-]?\d+)\s*\)?\s*([+−-])\s*\(?\s*([−-]?\d+)\s*\)?\s*=\s*\?/;
const num = (s) => Number(String(s).replace('−', '-'));

/** Lê "(−3) + 5 = ?" e devolve { inicio, passo, fim }. Devolve null se não for uma conta simples. */
export function lerConta(texto) {
    const m = RE.exec(String(texto).trim());
    if (!m) return null;
    const a = num(m[1]);
    const b = num(m[3]);
    const passo = m[2] === '+' ? b : -b;
    return { inicio: a, passo, fim: a + passo };
}

export function desenharReta(canvas, conta, progresso = 0) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const min = Math.min(conta.inicio, conta.fim, 0) - 2;
    const max = Math.max(conta.inicio, conta.fim, 0) + 2;
    const margem = 50;
    const x = (v) => margem + (v - min) / (max - min) * (W - 2 * margem);
    const y = H - 48;
    const passoRot = (max - min) > 26 ? 5 : (max - min) > 14 ? 2 : 1;

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#b7c3da';
    ctx.beginPath(); ctx.moveTo(margem - 20, y); ctx.lineTo(W - margem + 20, y); ctx.stroke();
    ctx.font = '700 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    for (let v = min; v <= max; v++) {
        ctx.beginPath(); ctx.moveTo(x(v), y - 8); ctx.lineTo(x(v), y + 8); ctx.stroke();
        if (v % passoRot === 0 || v === 0) {
            ctx.fillStyle = v === 0 ? '#f2b01e' : '#f4f6fb';
            ctx.fillText(String(v).replace('-', '−'), x(v), y + 32);
        }
    }
    // ponto de partida
    ctx.fillStyle = '#f2b01e';
    ctx.beginPath(); ctx.arc(x(conta.inicio), y, 10, 0, Math.PI * 2); ctx.fill();

    if (progresso > 0) {
        const x0 = x(conta.inicio), x1 = x(conta.fim);
        const xa = x0 + (x1 - x0) * progresso;
        const alto = 70;
        ctx.strokeStyle = '#35e08f'; ctx.lineWidth = 4;
        ctx.beginPath();
        const passos = 40;
        for (let i = 0; i <= passos * progresso; i++) {
            const t = i / passos;
            const px = x0 + (x1 - x0) * t;
            const py = y - 12 - Math.sin(t * Math.PI) * alto;
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.fillStyle = '#35e08f';
        ctx.beginPath(); ctx.arc(xa, y, 10, 0, Math.PI * 2); ctx.fill();
    }
}

export function animarSalto(canvas, conta) {
    let t = 0;
    const reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzido) { desenharReta(canvas, conta, 1); return; }
    const passo = () => {
        t += 0.04;
        desenharReta(canvas, conta, Math.min(t, 1));
        if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
}
