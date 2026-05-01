// js/data/questions/trilha6.js
// Bloco 5: MMC, MDC e Critérios de Divisibilidade - 6º ano
// BNCC: EF06MA05, EF06MA06

export const trilha6 = [

    // === CRITÉRIOS DE DIVISIBILIDADE (Q01-Q08) ===
    {
        id: "T6Q01", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Divisibilidade por 2 e 5",
        display: "O número 2.340 é divisível por 2, 5 e 10?",
        botoes: ["Sim, pelos três", "Só por 2 e 5", "Só por 2", "Não é divisível por nenhum"], res: "Sim, pelos três",
        passo: "Termina em 0: divisível por 2 (último dígito par), por 5 (termina em 0 ou 5) e por 10 (termina em 0).",
        dica: "Olhe apenas o último algarismo do número."
    },
    {
        id: "T6Q02", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Divisibilidade por 3",
        display: "O número 126 é divisível por 3?",
        botoes: ["Sim", "Não", "Depende", "Só por 9"], res: "Sim",
        passo: "Critério do 3: some os algarismos. 1+2+6=9. Como 9 é divisível por 3, o número também é.",
        dica: "Some os algarismos. Se o resultado for divisível por 3, o número também é."
    },
    {
        id: "T6Q03", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Divisibilidade por 9",
        display: "O número 315 é divisível por 9?",
        botoes: ["Sim", "Não", "Só por 3", "Depende"], res: "Sim",
        passo: "3+1+5=9. Como 9 é divisível por 9, o número 315 também é.",
        dica: "Some os algarismos. Se o resultado for divisível por 9, o número também é."
    },
    {
        id: "T6Q04", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Divisibilidade",
        display: "O número 847 é divisível por 2?",
        botoes: ["Não", "Sim", "Só pela metade", "Depende do contexto"], res: "Não",
        passo: "847 termina em 7, que é ímpar. Números divisíveis por 2 sempre terminam em 0, 2, 4, 6 ou 8.",
        dica: "Divisível por 2: último algarismo deve ser 0, 2, 4, 6 ou 8."
    },
    {
        id: "T6Q05", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Divisibilidade por 4",
        display: "O número 1.324 é divisível por 4?",
        botoes: ["Sim", "Não", "Só por 2", "Impossível saber"], res: "Sim",
        passo: "Critério do 4: os dois últimos dígitos (24) devem ser divisíveis por 4. 24÷4=6. Sim!",
        dica: "Para divisibilidade por 4, verifique apenas os dois últimos algarismos."
    },
    {
        id: "T6Q06", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Números Primos",
        display: "Qual destes números é PRIMO?",
        botoes: ["13", "15", "21", "27"], res: "13",
        passo: "13 só é divisível por 1 e por ele mesmo. 15=3×5, 21=3×7, 27=3×9.",
        dica: "Número primo tem exatamente 2 divisores: 1 e ele mesmo."
    },
    {
        id: "T6Q07", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Números Primos",
        display: "Quantos divisores tem um número primo?",
        botoes: ["2", "1", "3", "Infinitos"], res: "2",
        passo: "Todo número primo tem exatamente 2 divisores: o número 1 e ele mesmo.",
        dica: "Pense no número 7: só divide por 1 e por 7."
    },
    {
        id: "T6Q08", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Decomposição em Fatores Primos",
        display: "Qual é a decomposição de 12 em fatores primos?",
        botoes: ["2² × 3", "2 × 6", "3 × 4", "2 × 3 × 3"], res: "2² × 3",
        passo: "12 ÷ 2 = 6. 6 ÷ 2 = 3. 3 é primo. Logo: 12 = 2² × 3.",
        dica: "Divida sempre pelo menor primo possível até não conseguir mais."
    },

    // === DIVISORES (Q09-Q11) ===
    {
        id: "T6Q09", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Divisores",
        display: "Quantos divisores tem o número 18?",
        botoes: ["6", "4", "8", "3"], res: "6",
        passo: "Divisores de 18: 1, 2, 3, 6, 9, 18. São 6 divisores.",
        dica: "Liste todos os números que dividem 18 sem deixar resto."
    },
    {
        id: "T6Q10", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Divisores",
        display: "Qual destes números NÃO é divisor de 24?",
        botoes: ["7", "6", "8", "12"], res: "7",
        passo: "24÷7 não é inteiro. Os divisores de 24 são: 1, 2, 3, 4, 6, 8, 12, 24.",
        dica: "Divisor de 24 é aquele que divide 24 sem resto."
    },
    {
        id: "T6Q11", t: 5, tipo: "aritmetica", bncc: "EF06MA06", bncc_desc: "Divisores",
        display: "O número 1 é divisor de:",
        botoes: ["Todos os números inteiros", "Só dos números pares", "Só dos primos", "Nenhum número"], res: "Todos os números inteiros",
        passo: "Qualquer número dividido por 1 resulta no próprio número. Logo 1 divide todos.",
        dica: "Pense: qualquer número ÷ 1 = o próprio número."
    },

    // === MDC (Q12-Q16) ===
    {
        id: "T6Q12", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MDC",
        display: "Qual é o MDC (Máximo Divisor Comum) de 12 e 18?",
        botoes: ["6", "3", "9", "36"], res: "6",
        passo: "Divisores de 12: 1,2,3,4,6,12. Divisores de 18: 1,2,3,6,9,18. O maior comum é 6.",
        dica: "MDC: o maior número que divide os dois ao mesmo tempo."
    },
    {
        id: "T6Q13", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MDC",
        display: "Qual é o MDC de 24 e 36?",
        botoes: ["12", "6", "18", "4"], res: "12",
        passo: "24=2³×3. 36=2²×3². MDC = 2²×3 = 12.",
        dica: "Na fatoração, pegue os fatores comuns com o menor expoente."
    },
    {
        id: "T6Q14", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MDC",
        display: "Qual é o MDC de 15 e 25?",
        botoes: ["5", "3", "15", "75"], res: "5",
        passo: "15=3×5. 25=5². O único fator primo comum é 5.",
        dica: "15 e 25 têm o 5 em comum."
    },
    {
        id: "T6Q15", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MDC - Problema",
        display: "Ana tem 24 balas e 36 figurinhas. Quer distribuir em grupos iguais sem sobrar nada. Qual o maior número de grupos possível?",
        botoes: ["12", "6", "8", "4"], res: "12",
        passo: "MDC(24,36)=12. Pode fazer 12 grupos, cada um com 2 balas e 3 figurinhas.",
        dica: "Problema de distribuição igual: use o MDC."
    },
    {
        id: "T6Q16", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MDC",
        display: "O MDC de dois números primos diferentes é sempre:",
        botoes: ["1", "2", "O menor deles", "O produto deles"], res: "1",
        passo: "Números primos diferentes só têm o 1 como divisor comum. Logo MDC = 1.",
        dica: "Números primos só são divisíveis por 1 e por eles mesmos."
    },

    // === MMC (Q17-Q22) ===
    {
        id: "T6Q17", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MMC",
        display: "Qual é o MMC (Mínimo Múltiplo Comum) de 4 e 6?",
        botoes: ["12", "24", "8", "2"], res: "12",
        passo: "Múltiplos de 4: 4,8,12... Múltiplos de 6: 6,12... O menor comum é 12.",
        dica: "MMC: o menor número que é múltiplo dos dois ao mesmo tempo."
    },
    {
        id: "T6Q18", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MMC",
        display: "Qual é o MMC de 3 e 5?",
        botoes: ["15", "8", "30", "2"], res: "15",
        passo: "3 e 5 são primos entre si (MDC=1). Logo MMC = 3×5 = 15.",
        dica: "Quando os números não têm fator em comum, o MMC é o produto deles."
    },
    {
        id: "T6Q19", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MMC",
        display: "Qual é o MMC de 6 e 9?",
        botoes: ["18", "54", "3", "27"], res: "18",
        passo: "6=2×3. 9=3². MMC = 2×3² = 18.",
        dica: "Na fatoração, pegue todos os fatores com o maior expoente."
    },
    {
        id: "T6Q20", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MMC - Problema",
        display: "Dois ônibus partem juntos. Um passa a cada 20 min, outro a cada 30 min. Em quantos minutos passarão juntos novamente?",
        botoes: ["60 min", "50 min", "10 min", "600 min"], res: "60 min",
        passo: "MMC(20,30)=60. Eles se encontrarão novamente em 60 minutos.",
        dica: "Problema de encontro periódico: use o MMC."
    },
    {
        id: "T6Q21", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MMC - Problema",
        display: "Uma sirene apita a cada 4 minutos e outra a cada 6 minutos. Apitaram juntas agora. Em quantos minutos apitarão juntas de novo?",
        botoes: ["12 min", "24 min", "2 min", "10 min"], res: "12 min",
        passo: "MMC(4,6)=12. Apitarão juntas novamente em 12 minutos.",
        dica: "Quando duas coisas se repetem em períodos diferentes, use o MMC."
    },
    {
        id: "T6Q22", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MMC",
        display: "Qual é o menor número divisível por 2, 3 e 4 ao mesmo tempo?",
        botoes: ["12", "24", "6", "9"], res: "12",
        passo: "MMC(2,3,4)=12. 12÷2=6, 12÷3=4, 12÷4=3. Todos exatos.",
        dica: "Calcule o MMC dos três números."
    },

    // === PROBLEMAS INTEGRADOS MMC E MDC (Q23-Q25) ===
    {
        id: "T6Q23", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MDC e MMC - Aplicação",
        display: "João tem 48 lápis e 64 canetas. Quer distribuir em grupos iguais sem sobrar. Qual é o MAIOR número de grupos?",
        botoes: ["16", "8", "4", "32"], res: "16",
        passo: "MDC(48,64)=16. Ele pode fazer 16 grupos (3 lápis e 4 canetas em cada).",
        dica: "Distribuição igual sem sobra: MDC é a resposta."
    },
    {
        id: "T6Q24", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MMC - Problemas",
        display: "Três luzes piscam a cada 3, 4 e 6 segundos respectivamente. Piscaram juntas agora. Quando piscarão juntas de novo?",
        botoes: ["12 segundos", "24 segundos", "6 segundos", "72 segundos"], res: "12 segundos",
        passo: "MMC(3,4,6)=12. As três luzes piscarão juntas a cada 12 segundos.",
        dica: "MMC dos três períodos."
    },
    {
        id: "T6Q25", t: 5, tipo: "aritmetica", bncc: "EF06MA05", bncc_desc: "MDC e MMC - Contexto",
        display: "Para calcular o MMC de 8 e 12 por decomposição: 8=2³ e 12=2²×3. Qual é o MMC?",
        botoes: ["24", "48", "4", "96"], res: "24",
        passo: "MMC: maior expoente de cada fator. 2³×3 = 8×3 = 24.",
        dica: "No MMC, pegue cada fator primo com o maior expoente que aparece."
    }
];
