import { trilha4 } from './trilha4.js';

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function gerarQuestoesBloco4(quantidade = 20) {
  const questoes = [];

  for (let i = 0; i < quantidade; i++) {
    const x = randint(-10, 10);
    const a = randint(1, 6);
    const b = randint(-10, 10);
    const res = a * x + b;

    questoes.push({
      id: `B4G${String(i + 1).padStart(3, '0')}`,
      t: 4,
      tipo: 'aritmetica',
      bncc: 'EF07MA13',
      bncc_desc: 'Expressões Algébricas',
      display: `Se x = ${x}, calcule ${a}x + (${b})`,
      botoes: [String(res), String(res + a), String(res - a), String(-res)],
      res: String(res),
      passo: `${a}·${x} + (${b}) = ${res}`,
      dica: 'Substitua x e calcule por etapas.'
    });
  }

  return questoes;
}

export const bloco4 = [...trilha4, ...gerarQuestoesBloco4(20)];
