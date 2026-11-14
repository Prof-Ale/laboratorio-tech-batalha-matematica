# Laboratório Tech: Batalha Matemática

**Versão 7.0**

Jogo de batalha matemática para telão, criado pelo Prof. Alessandro Barbosa (Prof. Alê Chocolate). Duas turmas disputam pontos respondendo questões de Matemática, com placar em tempo real, combo, rodadas especiais e relatório de erros por turma. Funciona no navegador, sem instalar nada, e continua funcionando sem internet depois da primeira visita.

Escola Estadual PEI Prof. Milton de Tolosa, Campinas, SP. Pós-graduação em Ensino de Ciências e Matemática, IFSP Campus Capivari.

Demo: https://prof-ale.github.io/laboratorio-tech-batalha-matematica

## Como a batalha funciona

1. Na tela inicial, digite o nome das duas turmas (por exemplo 7ºA e 7ºB). Cada turma tem uma cor e uma forma: círculo azul e triângulo rosa, para ninguém depender só da cor.
2. Na Central de missões, escolha as regras e o assunto.
3. A turma da vez responde. Acertou, soma pontos e passa a vez. Errou, a resposta certa aparece com a resolução e o tipo de erro, e a vez passa para a outra turma.
4. Quem chegar primeiro à meta vence. A tela de resultado mostra os erros mais comuns da batalha.

**Regras da batalha** (o professor escolhe na Central):

* Meta de pontos: 100, 150, 250 ou 400
* Quem responde: alternado, ou buzzer (a turma que apertar A ou B no teclado primeiro responde)
* Tempo por questão: sem limite, 20, 30 ou 45 segundos
* Dificuldade: progressiva (começa no nível 1 e sobe conforme a melhor turma se aproxima da meta) ou fixa em 1, 2 ou 3

**Pontuação**

* Acerto vale 10 pontos, mais bônus de combo da própria turma: 5, 10 e depois 15 por acerto seguido
* Cada dica pedida custa 3 pontos (o acerto nunca vale menos de 4)
* A cada 5 rodadas, a rodada especial vale pontos em dobro
* Quando a melhor turma chega a 72% da meta, começa o desafio final, com 50% a mais por acerto
* O combo de uma turma não é afetado pelo que a outra faz

**Teclado (para usar no telão)**

* 1, 2, 3 e 4 marcam a alternativa
* A e B acionam o buzzer, no modo buzzer
* Enter ou seta para a direita passa para a próxima rodada
* Esc fecha as janelas
* O botão de tela cheia fica na barra do topo

## De onde vêm as questões

**Banco do evento.** 280 questões fixas do 6º e do 7º anos, em cinco blocos: inteiros (soma e subtração), múltiplos e divisores, inteiros (multiplicação e divisão), frações, decimais e porcentagem, e MMC e MDC. É o banco usado no Dia da Matemática de 2026. Nas contas de soma e subtração de inteiros, uma reta numérica mostra o ponto de partida e anima o salto depois da resposta.

**Banco do MathLab.** 96 assuntos do 6º ano à 3ª série do Ensino Médio, com cerca de 20 mil questões em três níveis. Elas vêm dos geradores do MathLab (https://prof-ale.github.io/MathLab) e trazem, além do enunciado:

* duas dicas em degraus, que o professor libera durante a batalha
* a explicação do erro de cada alternativa errada
* o nome do erro, como "somou em vez de multiplicar" ou "errou o sinal", que alimenta o relatório
* a resolução passo a passo

Na Central há três jeitos de escolher:

* **Recomposição do bimestre:** os cinco blocos do evento
* **Revisão por série:** mistura os assuntos de uma série, sorteando um assunto de cada vez
* **Todos os assuntos:** busca por nome, tema ou código BNCC, com filtro por série e por eixo

Ficaram de fora do jogo os assuntos que só fazem sentido com figura ou gráfico na tela, porque a Batalha não tem simulador. As questões que citam desenho, tabela ou controles do app foram descartadas na geração do banco, e as dicas que citam figura foram trocadas por uma dica geral.

## Relatório da turma

O botão do gráfico, no topo, abre o relatório. Ele soma as respostas de todas as batalhas feitas neste navegador, por turma e por assunto:

* percentual de acerto, com faixa em texto e símbolo (✔ Bem a partir de 75%, ▲ Atenção de 50% a 74%, ■ Retomar abaixo de 50%)
* os três erros mais comuns de cada assunto
* planilha CSV para guardar ou abrir no Excel

O relatório fica só no navegador do computador usado e não guarda nome de aluno, apenas o nome das turmas. O botão "Zerar relatório" apaga tudo.

## Acessibilidade (DUA)

* Letras grandes, feitas para projetor, e alto contraste entre texto e fundo
* Fontes Montserrat, Atkinson Hyperlegible (criada para leitura difícil) e JetBrains Mono
* Turmas diferenciadas por cor e por forma
* Faixas do relatório sempre com texto e símbolo
* Leitura em voz alta da questão, das alternativas e da resolução (Web Speech API, pt-BR), que pode ser desligada
* Navegação completa pelo teclado, com foco visível
* Animações reduzidas quando o aparelho pede (prefers-reduced-motion)
* Tempo por questão opcional, para quem precisa de mais calma

## Funciona sem internet

Depois da primeira visita, o jogo abre e roda o banco do evento sem internet, e os assuntos do MathLab que já foram abertos ficam guardados. Música, efeitos sonoros e vídeos do avatar dependem do navegador e podem não tocar offline. As fontes do Google, sem internet, são trocadas pelas do próprio computador.

Sempre que trocar arquivos do jogo, mude a constante `VERSAO` no começo do `sw.js`, para os computadores pegarem a atualização.

## Estrutura do projeto

```
laboratorio-tech-batalha-matematica/
├── index.html                  # as três telas e as janelas
├── sw.js                       # uso sem internet
├── css/style.css               # identidade visual
├── js/
│   ├── main.js                 # telas, teclado, relógio e relatório na tela
│   ├── batalha.js              # regras: pontos, combo, níveis, sorteio, vitória
│   ├── banco.js                # carrega e padroniza as questões
│   ├── relatorio.js            # soma e exporta o relatório
│   ├── audio.js                # efeitos, música e voz
│   ├── reta.js                 # reta numérica do banco do evento
│   ├── icones.js               # ícones SVG
│   └── data/questions/         # banco do evento (blocos 1 a 5)
├── data/banco/                 # banco do MathLab: um arquivo por assunto
├── assets/                     # imagens, áudio e vídeo do jogo
├── material-do-evento/         # infográficos e arquivos originais do evento
├── tools/gerar-banco.cjs       # gera data/banco a partir do MathLab
├── tools/gerar-complemento.cjs # assuntos extras de 6º e 7º (área, média, probabilidade, porcentagem)
└── tests/                      # testes automáticos
```

Não há build. O site é estático e usa módulos do navegador, por isso não abre com duplo clique no arquivo: use o GitHub Pages, o Netlify ou um servidor local.

## Como rodar localmente

```
git clone https://github.com/Prof-Ale/laboratorio-tech-batalha-matematica.git
cd laboratorio-tech-batalha-matematica
python3 -m http.server 8000
```

Depois abra http://localhost:8000.

## Como atualizar o banco do MathLab

Quando o MathLab ganhar assuntos ou questões novas, gere o banco de novo. Precisa do Node e do pacote `playwright` com o Chromium:

```
node tools/gerar-banco.cjs ../MathLab/index.html --por-gerador=20
node tools/gerar-complemento.cjs
```

O script sorteia vários exemplos de cada gerador (8 por gerador, ajustável com `--por-gerador=`), tira as repetidas e as que dependem de figura, troca o hífen pelo sinal de menos e grava um arquivo por assunto em `data/banco/`. Depois, rode os testes e mude a `VERSAO` do `sw.js`.

## Testes

```
node tests/testes.mjs     # banco e regras, sem instalar nada
node tests/e2e.cjs        # joga de verdade no Chromium (precisa do playwright)
```

O primeiro confere cada questão dos dois bancos (resposta dentro das alternativas, alternativas sem repetição, sem NaN, dica e resolução presentes, sinal de menos correto) e as regras: pontos, dicas, combo por turma, rodada especial, desafio final, níveis, sorteio sem repetir e o embaralhamento das alternativas. O segundo abre o jogo, joga uma batalha inteira, testa dica, buzzer, tempo esgotado, relatório, uso sem internet e o celular.

## Limites conhecidos

* Testado no Chromium. Ainda sem teste em Safari, em iPhone e com alunos em sala
* A resposta certa está dentro do arquivo do banco, então não serve para prova nem para disputa com valendo nota. O jogo é de revisão
* O banco do MathLab é um sorteio fixo de cada gerador (cerca de 8 variações por gerador), não um gerador infinito. Regerar o banco traz variações novas
* Assuntos que dependem de figura ou gráfico (por exemplo leitura de gráficos e parte de simetria) ficam de fora ou aparecem só com as questões que não precisam de desenho
* Música, efeitos e vídeos não ficam guardados para uso sem internet
* O relatório é por navegador: se trocar de computador, ele começa do zero

## Licença

Este repositório usa a licença MIT (arquivo LICENSE): o uso é livre, e o aviso de direitos autorais do Prof. Alessandro Barbosa (Prof. Alê Chocolate) deve acompanhar toda cópia. As questões do banco do MathLab vêm de outro projeto do mesmo autor, o MathLab, que tem os próprios termos de uso.

## Autor

Prof. Alessandro Barbosa, o Prof. Alê Chocolate: Café, Matemática, Planos, Projetos, Vida.
