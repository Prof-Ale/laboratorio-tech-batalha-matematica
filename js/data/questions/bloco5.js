function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function media(valores) {
  const soma = valores.reduce((acc, n) => acc + n, 0);
  return Number((soma / valores.length).toFixed(1));
}

function moda(valores) {
  const freq = new Map();
  valores.forEach((v) => freq.set(v, (freq.get(v) || 0) + 1));

  let melhor = valores[0];
  let maiorFreq = -1;
  for (const [valor, quantidade] of freq.entries()) {
    if (quantidade > maiorFreq) {
      maiorFreq = quantidade;
      melhor = valor;
    }
  }

  return melhor;
}

function distratoresNumero(valorCorreto) {
  const base = Number(valorCorreto);
  const opcoes = [
    base,
    Number((base + 1).toFixed(1)),
    Number((base - 1).toFixed(1)),
    Number((base + 2).toFixed(1))
  ];

  return [...new Set(opcoes.map(String))].slice(0, 4);
}

export function gerarQuestoesBloco5(quantidade = 30) {
  const questoes = [];

  for (let i = 0; i < quantidade; i++) {
    const tipo = i % 2 === 0 ? 'media' : 'moda';
    const valores = [randint(2, 20), randint(2, 20), randint(2, 20), randint(2, 20), randint(2, 20)];

    if (tipo === 'media') {
      const resposta = media(valores);
      let botoes = distratoresNumero(resposta);
      while (botoes.length < 4) botoes.push(String(Number(resposta + botoes.length + 0.5).toFixed(1)));

      questoes.push({
        id: `B5G${String(i + 1).padStart(3, '0')}`,
        t: 5,
        tipo: 'aritmetica',
        bncc: 'EF07MA36',
        bncc_desc: 'Média Aritmética',
        display: `Calcule a média de: ${valores.join(', ')}`,
        botoes: botoes.slice(0, 4),
        res: String(resposta),
        passo: `Somamos os valores e dividimos por 5. Média = ${resposta}.`,
        dica: 'Média = soma dos dados ÷ quantidade de dados.'
      });
    } else {
      const dados = [...valores, valores[randint(0, valores.length - 1)]];
      const resposta = moda(dados);
      let botoes = [...new Set([resposta, resposta + 1, resposta - 1, resposta + 2].map(String))];
      while (botoes.length < 4) botoes.push(String(randint(1, 25)));

      questoes.push({
        id: `B5G${String(i + 1).padStart(3, '0')}`,
        t: 5,
        tipo: 'aritmetica',
        bncc: 'EF07MA37',
        bncc_desc: 'Moda e Leitura de Dados',
        display: `Qual é a MODA dos dados: ${dados.join(', ')}?`,
        botoes: botoes.slice(0, 4),
        res: String(resposta),
        passo: `A moda é o valor que mais se repete. Aqui, ${resposta}.`,
        dica: 'Conte qual número aparece mais vezes.'
      });
    }
  }

  return questoes;
}

export const bloco5 = gerarQuestoesBloco5(30);
