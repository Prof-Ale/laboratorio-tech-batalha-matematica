import { trilha3 } from './trilha3.js';

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function gerarQuestoesBloco3(quantidade = 20) {
  const questoes = [];

  for (let i = 0; i < quantidade; i++) {
    const a = randint(-12, 12) || 3;
    const b = randint(-12, 12) || -2;
    const res = a * b;

    questoes.push({
      id: `B3G${String(i + 1).padStart(3, '0')}`,
      t: 3,
      tipo: 'sinais',
      bncc: 'EF07MA04',
      bncc_desc: 'Multiplicação de Inteiros',
      display: `${a} × ${b} = ?`,
      botoes: [String(res), String(-res), String(res + 2), String(res - 2)],
      res: String(res),
      passo: `${a} × ${b} = ${res}`,
      dica: 'Resolva o módulo e depois aplique a regra de sinais.'
    });
  }

  return questoes;
}

export const bloco3 = [...trilha3, ...gerarQuestoesBloco3(20)];
