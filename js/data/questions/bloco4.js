// bloco4.js - Frações (6º ano / revisão 1º bimestre 7º ano)
// Substituiu o bloco de Álgebra para o evento de 06/05/2026

import { trilha5 } from './trilha5.js';

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniq(arr) {
  return [...new Set(arr.map(String))];
}

// Gerador de questões de adição de frações com denominadores iguais
export function gerarQuestoesBloco4(quantidade = 10) {
  const questoes = [];

  const denominadores = [4, 6, 8, 10, 12];

  for (let i = 0; i < quantidade; i++) {
    const den = denominadores[i % denominadores.length];
    const a = randint(1, den - 1);
    const b = randint(1, den - a);
    const res = a + b;

    const botoes = uniq([
      String(res) + "/" + den,
      String(res + 1) + "/" + den,
      String(res - 1 > 0 ? res - 1 : res + 2) + "/" + den,
      String(a) + "/" + String(den * 2)
    ]).slice(0, 4);

    questoes.push({
      id: `B4G${String(i + 1).padStart(3, '0')}`,
      t: 4,
      tipo: 'aritmetica',
      bncc: 'EF06MA08',
      bncc_desc: 'Adição de Frações',
      display: `${a}/${den} + ${b}/${den} = ?`,
      botoes,
      res: `${res}/${den}`,
      passo: `Mesmo denominador: some os numeradores. ${a}+${b}=${res}. Resultado: ${res}/${den}.`,
      dica: 'Denominadores iguais: some os numeradores e mantenha o denominador.'
    });
  }

  return questoes;
}

export const bloco4 = [...trilha5, ...gerarQuestoesBloco4(10)];
