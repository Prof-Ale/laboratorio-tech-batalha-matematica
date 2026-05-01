// js/data/questions/trilha5.js
// Bloco 4: Frações - 6º ano / Revisão 1º bimestre 7º ano
// BNCC: EF06MA07, EF06MA08, EF06MA09

export const trilha5 = [

    // === CONCEITO E REPRESENTAÇÃO (Q01-Q04) ===
    {
        id: "T5Q01", t: 4, tipo: "aritmetica", bncc: "EF06MA07", bncc_desc: "Conceito de Fração",
        display: "Uma pizza foi dividida em 8 fatias iguais. João comeu 3 fatias. Qual fração representa o que João comeu?",
        botoes: ["3/8", "8/3", "3/5", "5/8"], res: "3/8",
        passo: "João comeu 3 de 8 partes. Numerador = partes comidas, denominador = total de partes.",
        dica: "Fração = partes que queremos / total de partes iguais."
    },
    {
        id: "T5Q02", t: 4, tipo: "aritmetica", bncc: "EF06MA07", bncc_desc: "Conceito de Fração",
        display: "Na fração 5/7, o número 7 representa o:",
        botoes: ["Denominador", "Numerador", "Quociente", "Dividendo"], res: "Denominador",
        passo: "Na fração p/q, p é o numerador (partes) e q é o denominador (total de partes iguais).",
        dica: "O número de baixo divide o todo em partes iguais."
    },
    {
        id: "T5Q03", t: 4, tipo: "aritmetica", bncc: "EF06MA07", bncc_desc: "Frações Equivalentes",
        display: "Qual fração é EQUIVALENTE a 1/2?",
        botoes: ["3/6", "2/3", "1/4", "3/4"], res: "3/6",
        passo: "1/2 = 1×3 / 2×3 = 3/6. Frações equivalentes representam a mesma quantidade.",
        dica: "Multiplique numerador e denominador pelo mesmo número."
    },
    {
        id: "T5Q04", t: 4, tipo: "aritmetica", bncc: "EF06MA07", bncc_desc: "Frações Equivalentes",
        display: "Qual é a forma SIMPLIFICADA de 6/9?",
        botoes: ["2/3", "3/4", "1/2", "3/5"], res: "2/3",
        passo: "MDC(6,9) = 3. Dividindo: 6÷3 / 9÷3 = 2/3.",
        dica: "Divida numerador e denominador pelo MDC dos dois."
    },

    // === COMPARAÇÃO (Q05-Q07) ===
    {
        id: "T5Q05", t: 4, tipo: "aritmetica", bncc: "EF06MA07", bncc_desc: "Comparação de Frações",
        display: "Qual é a MAIOR fração?",
        botoes: ["3/4", "2/3", "1/2", "5/8"], res: "3/4",
        passo: "Com denominador 24: 3/4=18/24, 2/3=16/24, 1/2=12/24, 5/8=15/24. A maior é 3/4.",
        dica: "Encontre o denominador comum e compare os numeradores."
    },
    {
        id: "T5Q06", t: 4, tipo: "aritmetica", bncc: "EF06MA07", bncc_desc: "Comparação de Frações",
        display: "Ordene do MENOR para o MAIOR: 1/2, 1/3, 1/4",
        botoes: ["1/4 < 1/3 < 1/2", "1/2 < 1/3 < 1/4", "1/3 < 1/4 < 1/2", "São iguais"], res: "1/4 < 1/3 < 1/2",
        passo: "Quanto maior o denominador com mesmo numerador, menor a fração. Logo: 1/4 < 1/3 < 1/2.",
        dica: "Com numeradores iguais, quem divide mais resulta em partes menores."
    },
    {
        id: "T5Q07", t: 4, tipo: "aritmetica", bncc: "EF06MA07", bncc_desc: "Comparação de Frações",
        display: "Qual destes números é MAIOR que 1 (fração imprópria)?",
        botoes: ["7/5", "3/7", "2/8", "4/9"], res: "7/5",
        passo: "7/5 = 1,4. Quando o numerador é maior que o denominador, a fração é maior que 1.",
        dica: "Fração imprópria: numerador maior que denominador."
    },

    // === ADIÇÃO E SUBTRAÇÃO - MESMO DENOMINADOR (Q08-Q11) ===
    {
        id: "T5Q08", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Adição de Frações",
        display: "3/8 + 2/8 = ?",
        botoes: ["5/8", "5/16", "6/8", "1/2"], res: "5/8",
        passo: "Mesmo denominador: some os numeradores e mantenha o denominador. 3+2=5, logo 5/8.",
        dica: "Denominadores iguais: some apenas os numeradores."
    },
    {
        id: "T5Q09", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Subtração de Frações",
        display: "5/6 − 2/6 = ?",
        botoes: ["3/6", "3/0", "7/6", "1/2"], res: "3/6",
        passo: "5/6 − 2/6 = 3/6 (que equivale a 1/2 simplificado).",
        dica: "Denominadores iguais: subtraia apenas os numeradores."
    },
    {
        id: "T5Q10", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Adição de Frações",
        display: "Uma receita pede 1/4 de xícara de açúcar e 2/4 de farinha. Quantas xícaras no total?",
        botoes: ["3/4", "3/8", "1/2", "1"], res: "3/4",
        passo: "1/4 + 2/4 = 3/4. Mesmo denominador: some os numeradores.",
        dica: "As duas frações têm o mesmo denominador (4)."
    },
    {
        id: "T5Q11", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Adição de Frações",
        display: "7/10 + 2/10 = ?",
        botoes: ["9/10", "9/20", "1", "10/10"], res: "9/10",
        passo: "7+2=9. Logo 9/10.",
        dica: "Mesmo denominador, some os numeradores."
    },

    // === ADIÇÃO E SUBTRAÇÃO - DENOMINADORES DIFERENTES (Q12-Q16) ===
    {
        id: "T5Q12", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Adição com MMC",
        display: "1/2 + 1/4 = ?",
        botoes: ["3/4", "2/6", "1/3", "2/4"], res: "3/4",
        passo: "MMC(2,4)=4. Converta: 1/2=2/4. Então: 2/4 + 1/4 = 3/4.",
        dica: "Encontre o MMC dos denominadores para igualar."
    },
    {
        id: "T5Q13", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Adição com MMC",
        display: "1/3 + 1/2 = ?",
        botoes: ["5/6", "2/5", "2/6", "3/5"], res: "5/6",
        passo: "MMC(3,2)=6. 1/3=2/6, 1/2=3/6. Soma: 2/6+3/6=5/6.",
        dica: "MMC de 2 e 3 é 6."
    },
    {
        id: "T5Q14", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Subtração com MMC",
        display: "3/4 − 1/2 = ?",
        botoes: ["1/4", "2/2", "1/2", "2/8"], res: "1/4",
        passo: "MMC(4,2)=4. 1/2=2/4. Então: 3/4 − 2/4 = 1/4.",
        dica: "Converta 1/2 para quartos."
    },
    {
        id: "T5Q15", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Adição com MMC",
        display: "2/5 + 1/10 = ?",
        botoes: ["5/10", "3/15", "4/10", "1/2"], res: "5/10",
        passo: "MMC(5,10)=10. 2/5=4/10. Então: 4/10+1/10=5/10 (=1/2).",
        dica: "O denominador 10 já é múltiplo de 5."
    },
    {
        id: "T5Q16", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Adição com MMC",
        display: "1/6 + 1/3 = ?",
        botoes: ["3/6", "2/9", "1/2", "2/6"], res: "3/6",
        passo: "MMC(6,3)=6. 1/3=2/6. Então: 1/6+2/6=3/6 (=1/2).",
        dica: "3 já divide 6."
    },

    // === FRAÇÃO DE UM NÚMERO (Q17-Q19) ===
    {
        id: "T5Q17", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Fração de um Número",
        display: "Quanto é 1/4 de 20?",
        botoes: ["5", "4", "8", "10"], res: "5",
        passo: "1/4 de 20 = 20 ÷ 4 = 5.",
        dica: "Divida o número pelo denominador e multiplique pelo numerador."
    },
    {
        id: "T5Q18", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Fração de um Número",
        display: "Uma turma tem 30 alunos. 2/3 são meninas. Quantas meninas há?",
        botoes: ["20", "10", "15", "18"], res: "20",
        passo: "2/3 de 30: 30÷3=10. 10×2=20 meninas.",
        dica: "Divida por 3 primeiro, depois multiplique por 2."
    },
    {
        id: "T5Q19", t: 4, tipo: "aritmetica", bncc: "EF06MA08", bncc_desc: "Fração de um Número",
        display: "Em uma caixa com 24 frutas, 3/8 são maçãs. Quantas maçãs há?",
        botoes: ["9", "8", "6", "12"], res: "9",
        passo: "3/8 de 24: 24÷8=3. 3×3=9 maçãs.",
        dica: "Divida 24 por 8 e multiplique o resultado por 3."
    },

    // === FRAÇÃO, DECIMAL E PORCENTAGEM (Q20-Q25) ===
    {
        id: "T5Q20", t: 4, tipo: "aritmetica", bncc: "EF06MA09", bncc_desc: "Fração e Decimal",
        display: "A fração 1/2 em decimal é:",
        botoes: ["0,5", "0,2", "0,12", "5,0"], res: "0,5",
        passo: "1 ÷ 2 = 0,5.",
        dica: "Divida o numerador pelo denominador."
    },
    {
        id: "T5Q21", t: 4, tipo: "aritmetica", bncc: "EF06MA09", bncc_desc: "Fração e Decimal",
        display: "3/4 em decimal é:",
        botoes: ["0,75", "0,34", "0,43", "1,75"], res: "0,75",
        passo: "3 ÷ 4 = 0,75.",
        dica: "Divida 3 por 4."
    },
    {
        id: "T5Q22", t: 4, tipo: "aritmetica", bncc: "EF06MA09", bncc_desc: "Porcentagem",
        display: "50% equivale a qual fração simplificada?",
        botoes: ["1/2", "5/10", "1/4", "2/3"], res: "1/2",
        passo: "50% = 50/100 = 1/2 (dividindo por 50).",
        dica: "Porcentagem é fração com denominador 100. Simplifique."
    },
    {
        id: "T5Q23", t: 4, tipo: "aritmetica", bncc: "EF06MA09", bncc_desc: "Porcentagem",
        display: "25% de 80 é igual a:",
        botoes: ["20", "25", "40", "8"], res: "20",
        passo: "25% = 1/4. 80 ÷ 4 = 20.",
        dica: "25% é o mesmo que 1/4."
    },
    {
        id: "T5Q24", t: 4, tipo: "aritmetica", bncc: "EF06MA09", bncc_desc: "Fração e Decimal",
        display: "O decimal 0,25 equivale a qual fração simplificada?",
        botoes: ["1/4", "2/5", "1/2", "1/5"], res: "1/4",
        passo: "0,25 = 25/100 = 1/4 (dividindo por 25).",
        dica: "Escreva como fração com denominador 100 e simplifique."
    },
    {
        id: "T5Q25", t: 4, tipo: "aritmetica", bncc: "EF06MA09", bncc_desc: "Porcentagem",
        display: "Em uma prova de 20 questões, um aluno acertou 15. Qual foi sua porcentagem de acerto?",
        botoes: ["75%", "80%", "70%", "60%"], res: "75%",
        passo: "15/20 = 3/4 = 0,75 = 75%.",
        dica: "Divida os acertos pelo total e multiplique por 100."
    }
];
