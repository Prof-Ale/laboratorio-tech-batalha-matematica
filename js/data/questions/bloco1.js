import { trilha1 } from './trilha1.js';

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniq(arr) {
  return [...new Set(arr.map(String))];
}

export function gerarQuestoesBloco1(quantidade = 20) {
  const questoes = [];

  for (let i = 0; i < quantidade; i++) {
    const a = randint(-20, 20);
    const b = randint(-20, 20);
    const res = a + b;

    const distratores = uniq([
      res,
      -res,
      res + randint(1, 4),
      res - randint(1, 4)
    ]).slice(0, 4);

    while (distratores.length < 4) distratores.push(String(randint(-40, 40)));

    questoes.push({
      id: `B1G${String(i + 1).padStart(3, '0')}`,
      t: 1,
      tipo: 'reta',
      bncc: 'EF07MA03',
      bncc_desc: 'Soma e Subtração na Reta',
      display: `${a} + ${b} = ?`,
      botoes: distratores.map(String),
      res: String(res),
      passo: `${a} + ${b} = ${res}`,
      dica: 'Some os inteiros observando os sinais.',
      a,
      b
    });
  }

  return questoes;
}

export const bloco1 = [...trilha1, ...gerarQuestoesBloco1(20)];
