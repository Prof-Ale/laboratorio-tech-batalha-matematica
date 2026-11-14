// tests/testes.mjs: roda com `node tests/testes.mjs` (Node 18 ou mais novo, sem instalar nada)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { poolDoBloco, menos, tipoDeErro } from '../js/banco.js';
import { paraFala } from '../js/fala.js';
import * as B from '../js/batalha.js';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let falhas = 0, passou = 0;
const ok = (cond, msg) => { if (cond) passou++; else { falhas++; console.error('FALHOU:', msg); } };

// 1. Banco do evento
for (let b = 1; b <= 5; b++) {
    const pool = poolDoBloco(b);
    ok(pool.length >= 40, `bloco ${b} tem ${pool.length} questões`);
    const ids = new Set();
    for (const q of pool) {
        ok(!ids.has(q.id), `id repetido ${q.id}`); ids.add(q.id);
        ok(q.c >= 0 && q.c < q.o.length, `resposta fora das alternativas em ${q.id}`);
        ok(new Set(q.o).size === q.o.length, `alternativas repetidas em ${q.id}`);
        ok(q.e && q.h.length >= 1, `sem resolução ou dica em ${q.id}`);
        ok(!/(^|[\s(])-\d/.test(q.q + q.o.join(' ')), `hífen no lugar de menos em ${q.id}: ${q.q}`);
    }
}
ok(menos('(-3) + 5 = ?') === '(−3) + 5 = ?', 'menos() em parênteses');
ok(menos('5 - 8') === '5 − 8', 'menos() em subtração');

ok(menos('−0') === '0' && menos('-0,5') === '−0,5' && menos('10 − 0') === '10 − 0', 'menos() não deixa −0');
const F = [['R$12', '12 reais'], ['R$ 1,00', '1 real'], ['R$ 12,50', '12 reais e 50 centavos'], ['R$ 1.200,05', '1200 reais e 5 centavos'], ['Pagou R$12 e ficou com R$3,5.', 'Pagou 12 reais e ficou com 3 reais e 50 centavos.'],
  ['25%', '25 por cento'], ['3/4 + 1/2', '3 sobre 4 mais 1 sobre 2'], ['−5 × 3', 'menos 5 vezes 3'], ['10 − 0', '10 menos 0'], ['−0', '0'],
  ['√81 = 9', 'raiz quadrada de 81 igual a 9'], ['5^3', '5 elevado a 3'], ['2^−3', '2 elevado a −3'.replace('−', 'menos ')], ['área de 12 m²', 'área de 12 metros quadrados'], ['90°', '90 graus'], ['8 ÷ 2', '8 dividido por 2']];
for (const [e, s] of F) ok(paraFala(e) === s, `paraFala(${e}) = "${paraFala(e)}", esperado "${s}"`);

// 2. Banco do MathLab
const man = JSON.parse(fs.readFileSync(path.join(raiz, 'data/banco/manifesto.json'), 'utf8')).assuntos;
ok(man.length >= 85, `manifesto com ${man.length} assuntos`);
let total = 0;
const anos = new Set(man.map(a => a.ano));
ok([6, 7, 8, 9, 10, 11, 12].every(a => anos.has(a)), 'todas as séries presentes');
for (const a of man) {
    const d = JSON.parse(fs.readFileSync(path.join(raiz, 'data/banco', a.id + '.json'), 'utf8'));
    for (const nv of ['1', '2', '3']) {
        ok((d.niveis[nv] || []).length >= 3, `${a.id} nível ${nv} com poucas questões`);
        for (const q of d.niveis[nv] || []) {
            total++;
            const tudo = [q.q, ...q.o, q.e, ...q.h].join(' ');
            ok(Number.isInteger(q.c) && q.c >= 0 && q.c < q.o.length, `${a.id}: c inválido`);
            ok(new Set(q.o).size === q.o.length, `${a.id}: alternativas repetidas: ${q.q.slice(0, 60)}`);
            ok(!/NaN|undefined|null|Infinity/.test(tudo), `${a.id}: texto com NaN/undefined: ${q.q.slice(0, 60)}`);
            ok(q.h.length >= 1, `${a.id}: sem dica`);
            ok(q.ms.length === q.o.length && q.tg.length === q.o.length, `${a.id}: ms/tg desalinhados`);
            ok(q.ms[q.c] == null, `${a.id}: explicação de erro na alternativa certa`);
            ok(!/(^|[\s(])-\d/.test(q.o.join(' ')), `${a.id}: hífen nas alternativas: ${q.o.join(' | ')}`);
        }
    }
}
console.log(`Banco MathLab: ${man.length} assuntos, ${total} questões conferidas`);

// 2b. Embaralhamento: a resposta certa não pode ficar sempre na mesma posição
{
    const pool1 = poolDoBloco(1);
    const pos = [0, 0, 0, 0];
    for (let i = 0; i < 400; i++) {
        const base = pool1[i % pool1.length];
        const e = B.embaralhar(base);
        ok(e.o[e.c] === base.o[base.c], `embaralhar perdeu a resposta certa em ${base.id}`);
        ok(new Set(e.o).size === base.o.length, 'embaralhar mudou as alternativas');
        pos[e.c]++;
    }
    ok(pos.every(n => n > 50), `posição da resposta certa desigual: ${pos}`);
    const tg = B.embaralhar({ o: ['a', 'b', 'c', 'd'], c: 2, tg: ['t0', 't1', null, 't3'], ms: ['m0', 'm1', null, 'm3'] }, () => 0.3);
    ok(tg.o[tg.c] === 'c' && tg.tg[tg.c] === null && tg.tg[tg.o.indexOf('d')] === 't3' && tg.ms[tg.o.indexOf('b')] === 'm1', 'tg e ms acompanham a alternativa');
    const fixo = B.embaralhar({ o: ['1', '2', 'Todas as anteriores', 'x'], c: 1, tg: [], ms: [] });
    ok(fixo.o[2] === 'Todas as anteriores' && fixo.c === 1, 'alternativa posicional não muda de lugar');
}

// 3. Regras
const q = (id, nivel, ass, c = 0) => ({ id, q: 'x', o: ['a', 'b', 'c', 'd'], c, tg: ['', 'erro 1', 'erro 2', 'erro 3'], ms: [null, 'm1', 'm2', 'm3'], h: ['d1', 'd2'], e: 'r', bncc: [], assunto: { id: ass, nome: ass }, nivel, reta: false });
const pool = [];
for (let i = 0; i < 30; i++) pool.push(q('a' + i, 1 + (i % 3), 'X'));
const p = B.criarPartida({ nomeA: 'A', nomeB: 'B', meta: 100 }, pool);
ok(B.nivelDaRodada(p) === 1, 'começa no nível 1');
const vistas = new Set();
for (let i = 0; i < 30; i++) { const s = B.sortear(p); ok(!vistas.has(s.id), 'sorteio repetiu antes de esgotar'); vistas.add(s.id); }
B.sortear(p);   // esgota e recomeça sem quebrar
ok(true, 'recomeça ao esgotar');
// pontuação
const p2 = B.criarPartida({ meta: 100 }, pool);
const atual = (pp) => pp.atual.c;
B.sortear(p2);
ok(B.calcularPontos(p2, 'A', 0) === 15, 'primeiro acerto: 10 + 5 de combo = 15');
ok(B.calcularPontos(p2, 'A', 2) === 9, 'duas dicas: 15 - 6 = 9');
let r = B.responder(p2, { chave: 'A', indice: atual(p2) });
ok(r.acerto && r.pts === 15 && p2.times.A.combo === 1 && p2.turno === 'B', 'acerto soma e passa a vez');
B.sortear(p2);
const errado = (pp, k) => pp.atual.o.indexOf(['a', 'b', 'c', 'd'][k]);
r = B.responder(p2, { chave: 'B', indice: errado(p2, 2) });
ok(!r.acerto && r.tag === 'erro 2' && r.explicacao === 'm2' && p2.times.B.combo === 0, 'erro usa o tipo de erro da alternativa');
B.sortear(p2);
r = B.responder(p2, { chave: 'A', indice: -1 });
ok(r.tag === 'tempo esgotado' && p2.times.A.combo === 0, 'tempo esgotado zera o combo');
// combo é por turma
const p3 = B.criarPartida({ meta: 1000 }, pool);
B.sortear(p3); B.responder(p3, { chave: 'A', indice: atual(p3) });
B.sortear(p3); B.responder(p3, { chave: 'B', indice: errado(p3, 1) });
ok(p3.times.A.combo === 1 && p3.times.B.combo === 0, 'combo separado por turma');
// rodada especial e fase final
const p4 = B.criarPartida({ meta: 100 }, pool);
p4.rodada = 5; ok(B.ehRodadaEspecial(p4) && B.calcularPontos(p4, 'A') === 30, 'rodada 5 vale em dobro');
p4.rodada = 1; p4.times.A.pts = 80; ok(B.emFaseFinal(p4) && B.calcularPontos(p4, 'B') === 23, 'fase final vale +50%');
// vitória
const p5 = B.criarPartida({ meta: 20 }, pool);
B.sortear(p5); B.responder(p5, { chave: 'A', indice: atual(p5) });
ok(!p5.encerrada, 'ainda não bateu a meta');
B.sortear(p5); p5.turno = 'A'; B.responder(p5, { chave: 'A', indice: atual(p5) });
ok(p5.encerrada && B.vencedor(p5) === 'A', 'bateu a meta: encerra e A vence');
// nível fixo
const p6 = B.criarPartida({ nivel: 3, meta: 100 }, pool);
for (let i = 0; i < 8; i++) ok(B.sortear(p6).nivel === 3, 'nível fixo respeitado');
// nível progressivo
const p7 = B.criarPartida({ meta: 100 }, pool); p7.times.B.pts = 50; ok(B.nivelDaRodada(p7) === 2, 'nível 2 na metade'); p7.times.B.pts = 80; ok(B.nivelDaRodada(p7) === 3, 'nível 3 perto do fim');
// erro de sinal no banco do evento
const leg = { o: ['−4', '4', '10', '−10'], c: 1, tg: [] };
ok(tipoDeErro(leg, 0) === 'errou o sinal' && tipoDeErro(leg, 2) === 'erro de cálculo', 'erro de sinal detectado');

console.log(`${passou} verificações passaram, ${falhas} falharam`);
process.exit(falhas ? 1 : 0);
