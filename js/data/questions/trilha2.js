// js/data/questions/trilha2.js

export const trilha2 = [
    // === BLOCO 1: MÚLTIPLOS (1 a 6) ===
    {
        id: "T2Q01", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "Selecione um número que seja MÚLTIPLO de 7:", 
        botoes: ["14", "21", "17", "24"], res: ["14", "21"], 
        passo: "Tanto 14 (7x2) quanto 21 (7x3) estão na tabuada do 7.", 
        dica: "Pense na tabuada do 7. Há duas opções corretas!"
    },
    {
        id: "T2Q02", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "Qual destes números NÃO é múltiplo de 4?", 
        botoes: ["12", "16", "14", "20"], res: "14", 
        passo: "12, 16 e 20 estão na tabuada do 4. O 14 não dá divisão exata por 4.", 
        dica: "Procure o 'intruso' que não está na tabuada do 4."
    },
    {
        id: "T2Q03", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "Selecione um múltiplo de 6 que esteja entre 10 e 20:", 
        botoes: ["12", "18", "16", "24"], res: ["12", "18"], 
        passo: "Os múltiplos de 6 são: 0, 6, 12, 18, 24... Entre 10 e 20 temos o 12 e o 18.", 
        dica: "Tem mais de uma opção certa!"
    },
    {
        id: "T2Q04", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "O número ZERO é múltiplo de quais números?", 
        botoes: ["De nenhum", "Só do 1", "Só dele mesmo", "De todos"], res: "De todos", 
        passo: "Qualquer número multiplicado por zero resulta em zero. Logo, zero é múltiplo de todos os números.", 
        dica: "O que acontece se multiplicar qualquer número por 0?"
    },
    {
        id: "T2Q05", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "Selecione um múltiplo de 8:", 
        botoes: ["24", "32", "18", "42"], res: ["24", "32"], 
        passo: "8x3 = 24 e 8x4 = 32. Ambos são múltiplos de 8.", 
        dica: "Lembre-se da tabuada do 8."
    },
    {
        id: "T2Q06", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "Se um número termina em ZERO, ele é obrigatoriamente múltiplo de:", 
        botoes: ["3", "10", "4", "7"], res: "10", 
        passo: "A regra de divisibilidade por 10 diz que todos os seus múltiplos terminam no algarismo zero.", 
        dica: "Pense nas notas de dinheiro."
    },

    // === BLOCO 2: DIVISORES (7 a 12) ===
    {
        id: "T2Q07", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "Selecione um DIVISOR de 20:", 
        botoes: ["4", "5", "3", "6"], res: ["4", "5"], 
        passo: "20 pode ser dividido de forma exata por 4 (dá 5) e por 5 (dá 4).", 
        dica: "Quais destes números cabem perfeitamente dentro do 20?"
    },
    {
        id: "T2Q08", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "Qual é o MAIOR divisor de 36?", 
        botoes: ["12", "18", "36", "72"], res: "36", 
        passo: "O maior divisor de qualquer número (diferente de zero) é ele próprio.", 
        dica: "Não confunda divisor com múltiplo!"
    },
    {
        id: "T2Q09", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "Qual é o divisor comum de 12 e 15?", 
        botoes: ["2", "3", "4", "5"], res: "3", 
        passo: "O número 3 divide tanto o 12 (dá 4) quanto o 15 (dá 5) de forma exata.", 
        dica: "Que número está nas duas tabuadas ao mesmo tempo?"
    },
    {
        id: "T2Q10", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "Quais destes números são divisores de 24?", 
        botoes: ["6", "8", "5", "7"], res: ["6", "8"], 
        passo: "24 dividido por 6 dá 4. E 24 dividido por 8 dá 3. Ambos são divisores.", 
        dica: "Há dois números corretos!"
    },
    {
        id: "T2Q11", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Múltiplos e Divisores",
        display: "Qual número é divisor de TODOS os números naturais?", 
        botoes: ["0", "1", "2", "10"], res: "1", 
        passo: "Qualquer número dividido por 1 resulta nele mesmo. O zero nunca pode ser divisor (não se divide por zero).", 
        dica: "Qual é o menor divisor de qualquer número?"
    },
    {
        id: "T2Q12", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Critérios de Divisibilidade",
        display: "Para um número ser divisível por 2, ele tem que ser obrigatoriamente:", 
        botoes: ["Primo", "Ímpar", "Par", "Maior que 10"], res: "Par", 
        passo: "Todo número par termina em 0, 2, 4, 6 ou 8 e pode ser dividido por 2 de forma exata.", 
        dica: "Metade exata só funciona com que tipo de números?"
    },

    // === BLOCO 3: NÚMEROS PRIMOS (13 a 18) ===
    {
        id: "T2Q13", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Números Primos",
        display: "Qual destes é um NÚMERO PRIMO?", 
        botoes: ["15", "17", "21", "19"], res: ["17", "19"], 
        passo: "Tanto 17 quanto 19 só possuem dois divisores: o 1 e eles próprios.", 
        dica: "Procure os números que não estão em nenhuma tabuada (além da do 1)."
    },
    {
        id: "T2Q14", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Números Primos",
        display: "Qual é o ÚNICO número primo que é PAR?", 
        botoes: ["0", "2", "4", "Não existe"], res: "2", 
        passo: "O 2 só é divisível por 1 e por ele mesmo. Todos os outros números pares são divisíveis por 2, logo são compostos.", 
        dica: "É o menor número primo."
    },
    {
        id: "T2Q15", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Números Primos",
        display: "Selecione um número COMPOSTO (não é primo):", 
        botoes: ["9", "11", "15", "13"], res: ["9", "15"], 
        passo: "O 9 (3x3) e o 15 (3x5) têm mais de dois divisores, por isso são chamados de números compostos.", 
        dica: "Cuidado com os números ímpares que parecem primos mas não são!"
    },
    {
        id: "T2Q16", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Números Primos",
        display: "Quantos divisores naturais possui um número primo?", 
        botoes: ["Nenhum", "1", "Exatamente 2", "Infinitos"], res: "Exatamente 2", 
        passo: "Um número primo é definido exatamente por ter apenas dois divisores positivos: o 1 e ele mesmo.", 
        dica: "Lembre-se da regra de ouro dos primos."
    },
    {
        id: "T2Q17", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Números Primos",
        display: "O número 1 é considerado primo?", 
        botoes: ["Sim", "Não", "Só às vezes", "Depende"], res: "Não", 
        passo: "O número 1 tem apenas UM divisor (ele mesmo). Como os primos exigem dois divisores, o 1 não é primo nem composto.", 
        dica: "Quantos divisores diferentes o número 1 tem?"
    },
    {
        id: "T2Q18", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Números Primos",
        display: "Identifique um número primo entre 20 e 30:", 
        botoes: ["21", "23", "27", "29"], res: ["23", "29"], 
        passo: "O 21 (3x7) e o 27 (3x9) são compostos. Apenas o 23 e o 29 são primos nesta dezena.", 
        dica: "Dois destes são corretos!"
    },

    // === BLOCO 4: MMC (19 a 24) ===
    {
        id: "T2Q19", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Mínimo Múltiplo Comum (MMC)",
        display: "Qual é o MMC (Mínimo Múltiplo Comum) entre 2 e 3?", 
        botoes: ["5", "6", "12", "1"], res: "6", 
        passo: "Múltiplos de 2: 2, 4, 6... Múltiplos de 3: 3, 6... O menor em comum é o 6.", 
        dica: "Qual é o menor número que está na tabuada dos dois ao mesmo tempo?"
    },
    {
        id: "T2Q20", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Mínimo Múltiplo Comum (MMC)",
        display: "Qual é o MMC de 4 e 6?", 
        botoes: ["10", "12", "24", "2"], res: "12", 
        passo: "Os múltiplos de 4 são 4, 8, 12, 16... Os múltiplos de 6 são 6, 12, 18... O menor encontro é no 12.", 
        dica: "Atenção: não basta multiplicar os dois números!"
    },
    {
        id: "T2Q21", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Mínimo Múltiplo Comum (MMC)",
        display: "Você toma um remédio de 4 em 4h e outro de 6 em 6h. Se tomou os dois agora, daqui a quantas horas os tomará juntos novamente?", 
        botoes: ["10h", "12h", "24h", "6h"], res: "12h", 
        passo: "Problemas de 'encontros no futuro' resolvem-se com o MMC. O MMC de 4 e 6 é 12.", 
        dica: "Problema clássico de MMC!"
    },
    {
        id: "T2Q22", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Mínimo Múltiplo Comum (MMC)",
        display: "Qual o MMC entre 3 e 5 (que são números primos)?", 
        botoes: ["8", "15", "1", "30"], res: "15", 
        passo: "O MMC de dois números primos é sempre a multiplicação entre eles (3 x 5 = 15).", 
        dica: "Se não têm nada em comum, multiplique-os!"
    },
    {
        id: "T2Q23", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Mínimo Múltiplo Comum (MMC)",
        display: "Qual é o MMC de 10 e 15?", 
        botoes: ["30", "5", "60", "150"], res: "30", 
        passo: "Múltiplos de 10: 10, 20, 30... Múltiplos de 15: 15, 30... O menor encontro é 30.", 
        dica: "Pense no relógio: 15, 30, 45, 60..."
    },
    {
        id: "T2Q24", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Mínimo Múltiplo Comum (MMC)",
        display: "O ônibus A passa a cada 15 min. O ônibus B a cada 20 min. Se saíram juntos agora, em quantos minutos se encontram no terminal?", 
        botoes: ["35 min", "45 min", "60 min", "120 min"], res: "60 min", 
        passo: "O MMC de 15 e 20 é 60. Eles encontrar-se-ão exatamente de 1 em 1 hora.", 
        dica: "Problema de encontro = MMC."
    },

    // === BLOCO 5: MDC (25 a 30) ===
    {
        id: "T2Q25", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Máximo Divisor Comum (MDC)",
        display: "Qual é o MDC (Máximo Divisor Comum) entre 10 e 15?", 
        botoes: ["2", "3", "5", "30"], res: "5", 
        passo: "O maior número que divide o 10 (dá 2) e o 15 (dá 3) de forma exata é o 5.", 
        dica: "Qual é o MAIOR número que divide ambos?"
    },
    {
        id: "T2Q26", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Máximo Divisor Comum (MDC)",
        display: "Qual é o MDC de 12 e 18?", 
        botoes: ["2", "3", "6", "36"], res: "6", 
        passo: "Ambos dividem por 2 e por 3. Mas o MAIOR divisor comum é o 6.", 
        dica: "Não escolha o primeiro divisor que encontrar, procure o máximo!"
    },
    {
        id: "T2Q27", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Máximo Divisor Comum (MDC)",
        display: "Tenho duas fitas, uma de 20m e outra de 30m. Quero cortá-las em pedaços do mesmo tamanho, sendo o maior possível. Qual será o tamanho?", 
        botoes: ["5m", "10m", "50m", "2m"], res: "10m", 
        passo: "Problemas de 'cortes e divisões máximas' resolvem-se com o MDC. O MDC de 20 e 30 é 10.", 
        dica: "Problema clássico de MDC: cortar em partes iguais máximas."
    },
    {
        id: "T2Q28", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Máximo Divisor Comum (MDC)",
        display: "Qual o MDC entre dois números primos, como o 7 e o 11?", 
        botoes: ["77", "1", "7", "11"], res: "1", 
        passo: "Como os números primos só dividem por 1 e por eles mesmos, o único divisor que têm em comum é o 1.", 
        dica: "Se não têm nada em comum, quem salva a divisão?"
    },
    {
        id: "T2Q29", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Máximo Divisor Comum (MDC)",
        display: "Qual é o MDC de 24 e 36?", 
        botoes: ["6", "8", "12", "72"], res: "12", 
        passo: "Ambos são divisíveis por 2, 3, 4 e 6. Mas o MAIOR divisor possível entre eles é o 12.", 
        dica: "É o dobro de 6."
    },
    {
        id: "T2Q30", t: 2, tipo: "aritmetica", bncc: "EF07MA01", bncc_desc: "Máximo Divisor Comum (MDC)",
        display: "Temos duas turmas: uma com 30 alunos e outra com 42. Queremos formar grupos com o mesmo nº de alunos e no maior tamanho possível, sem misturar turmas. Quantos alunos por grupo?", 
        botoes: ["2", "3", "6", "7"], res: "6", 
        passo: "O MDC de 30 e 42 é 6. Serão 5 grupos numa turma e 7 grupos na outra.", 
        dica: "Procure o MDC entre 30 e 42."
    }
];
