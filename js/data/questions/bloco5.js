// bloco5.js - MMC, MDC e Divisibilidade (6º ano)
// Substituiu Estatística para o evento de 06/05/2026

import { trilha6 } from './trilha6.js';

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mmc(a, b) {
  const maior = Math.max(a, b);
  const menor = Math.min(a, b);
  for (let i = maior; i <= a * b; i += maior) {
    if (i % menor === 0) return i;
  }
  return a * b;
}

function mdc(a, b) {
  while (b !== 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Gerador de questões de MMC
export function gerarQuestoesBloco5(quantidade = 10) {
  const questoes = [];
  const pares = [
    [2, 3], [3, 4], [4, 6], [5, 10], [6, 8],
    [2, 5], [3, 9], [4, 10], [6, 9], [8, 12]
  ];

  for (let i = 0; i < quantidade; i++) {
    const [a, b] = pares[i % pares.length];
    const res = mmc(a, b);
    const errado1 = res * 2;
    const errado2 = mdc(a, b);
    const errado3 = a * b;

    const botoes = [...new Set([
      String(res), String(errado1), String(errado2), String(errado3 !== res ? errado3 : errado1 + 1)
    ])].slice(0, 4);

    questoes.push({
      id: `B5G${String(i + 1).padStart(3, '0')}`,
      t: 5,
      tipo: 'aritmetica',
      bncc: 'EF06MA05',
      bncc_desc: 'MMC',
      display: `Qual é o MMC de ${a} e ${b}?`,
      botoes,
      res: String(res),
      passo: `O menor múltiplo comum de ${a} e ${b} é ${res}.`,
      dica: 'Liste os múltiplos de cada número e encontre o menor que aparece nos dois.'
    });
  }

  return questoes;
}

export const bloco5 = [...trilha6, ...gerarQuestoesBloco5(10)];
