import { trilha2 } from './trilha2.js';

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function gerarQuestoesBloco2(quantidade = 20) {
  const questoes = [];

  for (let i = 0; i < quantidade; i++) {
    const n = randint(10, 120);
    const d = randint(2, 12);
    const res = n % d;
    const respostas = [res, (res + 1) % d, (res + 2) % d, Math.max(0, res - 1)];
    const botoes = [...new Set(respostas.map(String))];
    while (botoes.length < 4) botoes.push(String((res + botoes.length + 1) % d));

    questoes.push({
      id: `B2G${String(i + 1).padStart(3, '0')}`,
      t: 2,
      tipo: 'aritmetica',
      bncc: 'EF07MA01',
      bncc_desc: 'Múltiplos e Divisores',
      display: `Qual é o resto de ${n} ÷ ${d}?`,
      botoes,
      res: String(res),
      passo: `${n} ÷ ${d} deixa resto ${res}.`,
      dica: 'Use divisão inteira para descobrir o resto.'
    });
  }

  return questoes.map((q) => ({ ...q, botoes: q.botoes.slice(0, 4) }));
}

export const bloco2 = [...trilha2, ...gerarQuestoesBloco2(20)];
