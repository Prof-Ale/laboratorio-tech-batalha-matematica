/**
 * js/data/questions/trilha3.js
 * BLOCO 3: Multiplicação, Divisão e Potenciação de Inteiros
 * Total: 40 Questões
 */

export const bloco3 = [
    // === BLOCO 1: REGRA DE SINAIS - MULTIPLICAÇÃO E DIVISÃO (01 a 10) ===
    {
        id: "T3Q01", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "(-5) × (-3) = ?", 
        botoes: ["-15", "15", "-8", "8"], res: "15", 
        passo: "Sinais iguais na multiplicação resultam em positivo. 5 x 3 = 15.", 
        dica: "Menos com Menos dá Mais!"
    },
    {
        id: "T3Q02", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Divisão de Inteiros",
        display: "(-20) ÷ 4 = ?", 
        botoes: ["5", "-5", "-16", "16"], res: "-5", 
        passo: "Sinais diferentes na divisão resultam em negativo. 20 / 4 = 5.", 
        dica: "Inimigo (-) do meu amigo (+) é meu inimigo (-)."
    },
    {
        id: "T3Q03", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "7 × (-2) = ?", 
        botoes: ["-14", "14", "-5", "5"], res: "-14", 
        passo: "Um número positivo vezes um negativo resulta em negativo.", 
        dica: "Sinais diferentes? Resultado negativo."
    },
    {
        id: "T3Q04", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Divisão de Inteiros",
        display: "(-30) ÷ (-6) = ?", 
        botoes: ["-5", "5", "-36", "36"], res: "5", 
        passo: "Divisão de dois números negativos resulta em positivo.", 
        dica: "Menos dividido por menos dá mais!"
    },
    {
        id: "T3Q05", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "(-1) × (-1) × (-1) = ?", 
        botoes: ["1", "-1", "3", "-3"], res: "-1", 
        passo: "(-1 x -1) = +1. Depois, (+1 x -1) = -1.", 
        dica: "Quantidade ímpar de sinais de menos resulta em negativo."
    },
    {
        id: "T3Q06", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "(-10) × 0 = ?", 
        botoes: ["-10", "10", "0", "1"], res: "0", 
        passo: "Qualquer número multiplicado por zero é sempre zero.", 
        dica: "O zero é o elemento nulo da multiplicação."
    },
    {
        id: "T3Q07", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Regra de Sinais",
        display: "Qual multiplicação resulta em um número POSITIVO?", 
        botoes: ["(-2) x (-4)", "3 x (-5)", "(-8) x 1", "0 x (-6)"], res: "(-2) x (-4)", 
        passo: "Apenas a multiplicação de dois sinais iguais resulta em positivo.", 
        dica: "Procure sinais iguais."
    },
    {
        id: "T3Q08", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Divisão de Inteiros",
        display: "(-100) ÷ (-10) = ?", 
        botoes: ["-10", "10", "-90", "90"], res: "10", 
        passo: "Menos com menos dá mais. 100 / 10 = 10.", 
        dica: "Corte os zeros e verifique o sinal."
    },
    {
        id: "T3Q09", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "(-4) × 5 = ?", 
        botoes: ["20", "-20", "1", "-9"], res: "-20", 
        passo: "Sinais diferentes? Resultado negativo. 4 x 5 = 20.", 
        dica: "Diferentes = Negativo."
    },
    {
        id: "T3Q10", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Operações com Inteiros",
        display: "Qual o sinal de: (-1) x (-2) x (-3) x (-4)?", 
        botoes: ["Positivo (+)", "Negativo (-)", "Zero", "Neutro"], res: "Positivo (+)", 
        passo: "Como há 4 sinais negativos (número par), o resultado é positivo.", 
        dica: "Conte os sinais de menos: par dá mais."
    },

    // === BLOCO 2: OPERAÇÕES MISTAS E PARÊNTESES (11 a 20) ===
    {
        id: "T3Q11", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "2 + 3 × (-4) = ?", 
        botoes: ["-20", "-10", "10", "-14"], res: "-10", 
        passo: "Multiplicação primeiro: 3 x (-4) = -12. Depois: 2 + (-12) = -10.", 
        dica: "Multiplicação vem antes da soma!"
    },
    {
        id: "T3Q12", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "(-10) + (-5) × 2 = ?", 
        botoes: ["-30", "-20", "0", "-15"], res: "-20", 
        passo: "Multiplicação primeiro: (-5) x 2 = -10. Depois: (-10) + (-10) = -20.", 
        dica: "Hierarquia: Mult primeiro."
    },
    {
        id: "T3Q13", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Parênteses",
        display: "( -8 + 2 ) × 3 = ?", 
        botoes: ["-18", "18", "-30", "30"], res: "-18", 
        passo: "Parênteses primeiro: -8 + 2 = -6. Depois: -6 x 3 = -18.", 
        dica: "Parênteses são prioridade!"
    },
    {
        id: "T3Q14", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "15 ÷ (-3) + 2 = ?", 
        botoes: ["-3", "3", "-7", "7"], res: "-3", 
        passo: "Divisão primeiro: 15 / -3 = -5. Depois: -5 + 2 = -3.", 
        dica: "Divisão antes da adição."
    },
    {
        id: "T3Q15", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "(-2) × (-3) - 10 = ?", 
        botoes: ["-4", "4", "-16", "16"], res: "-4", 
        passo: "Multiplicação: (-2) x (-3) = 6. Depois: 6 - 10 = -4.", 
        dica: "Menos com menos dá mais!"
    },
    {
        id: "T3Q16", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Regra de Sinais",
        display: "5 - (-3) = ?", 
        botoes: ["2", "8", "-8", "-2"], res: "8", 
        passo: "Subtrair um negativo é somar: 5 + 3 = 8.", 
        dica: "Menos com menos vira mais."
    },
    {
        id: "T3Q17", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "(-1) - (-5) = ?", 
        botoes: ["-6", "4", "-4", "6"], res: "4", 
        passo: "Inverte o sinal: -1 + 5 = 4.", 
        dica: "O sinal de menos inverte o parênteses."
    },
    {
        id: "T3Q18", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "(-4) × ( 5 - 8 ) = ?", 
        botoes: ["12", "-12", "52", "-52"], res: "12", 
        passo: "Parênteses: 5 - 8 = -3. Depois: (-4) x (-3) = 12.", 
        dica: "Resolva o segredo do parênteses primeiro."
    },
    {
        id: "T3Q19", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "10 + (-2) × (-5) = ?", 
        botoes: ["0", "20", "40", "-20"], res: "20", 
        passo: "Multiplicação: (-2) x (-5) = 10. Soma: 10 + 10 = 20.", 
        dica: "Mult primeiro, soma depois."
    },
    {
        id: "T3Q20", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "(-18) ÷ 2 - (-5) = ?", 
        botoes: ["-4", "-14", "4", "14"], res: "-4", 
        passo: "Divisão: -18 / 2 = -9. Depois: -9 + 5 = -4.", 
        dica: "Transforme a subtração em adição."
    },

    // === BLOCO 3: POTENCIAÇÃO COM INTEIROS (21 a 30) ===
    {
        id: "T3Q21", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "(-3)² = ?", 
        botoes: ["-9", "9", "-6", "6"], res: "9", 
        passo: "(-3) x (-3) = 9. Base negativa com expoente PAR fica positiva.", 
        dica: "Par vira positivo!"
    },
    {
        id: "T3Q22", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "(-2)³ = ?", 
        botoes: ["8", "-8", "6", "-6"], res: "-8", 
        passo: "(-2) x (-2) x (-2) = -8. Expoente ÍMPAR mantém o sinal.", 
        dica: "Ímpar mantém o sinal."
    },
    {
        id: "T3Q23", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "(-5)¹ = ?", 
        botoes: ["5", "-5", "1", "-1"], res: "-5", 
        passo: "Qualquer número elevado a 1 é ele mesmo.", 
        dica: "Expoente 1 é o espelho."
    },
    {
        id: "T3Q24", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "(-10)⁰ = ?", 
        botoes: ["1", "-1", "0", "-10"], res: "1", 
        passo: "Todo número elevado a zero é igual a 1.", 
        dica: "Regra do zero."
    },
    {
        id: "T3Q25", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "Qual o valor de: - 3² ?", 
        botoes: ["9", "-9", "6", "-6"], res: "-9", 
        passo: "Sem parênteses, apenas o número 3 é elevado: -(3 x 3) = -9.", 
        dica: "Cuidado! Não tem parênteses."
    },
    {
        id: "T3Q26", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "(-1)¹⁰⁰ = ?", 
        botoes: ["1", "-1", "100", "-100"], res: "1", 
        passo: "Base -1 elevada a expoente par resulta em 1.", 
        dica: "100 é par!"
    },
    {
        id: "T3Q27", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "(-1)⁹⁹ = ?", 
        botoes: ["1", "-1", "99", "-99"], res: "-1", 
        passo: "Base -1 elevada a expoente ímpar resulta em -1.", 
        dica: "99 é ímpar."
    },
    {
        id: "T3Q28", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "(-4)² + (-2)³ = ?", 
        botoes: ["24", "8", "-24", "16"], res: "8", 
        passo: "16 + (-8) = 8.", 
        dica: "Resolva cada potência primeiro."
    },
    {
        id: "T3Q29", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "Se x = -2, qual o valor de x²?", 
        botoes: ["4", "-4", "2", "-2"], res: "4", 
        passo: "(-2)² = 4.", 
        dica: "Substitua e use parênteses."
    },
    {
        id: "T3Q30", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "(-2)⁴ resulta em um número:", 
        botoes: ["Positivo", "Negativo", "Zero", "Primo"], res: "Positivo", 
        passo: "Expoente par, resultado positivo (16).", 
        dica: "Olhe o expoente."
    },

    // === QUESTÕES EXTRAS: MULTIPLICAÇÃO E DIVISÃO (31 a 40) ===
    {
        id: "T3Q31", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Multiplicação",
        display: "(−6) × (−6) = ?",
        botoes: ["36", "−36", "12", "−12"], res: "36",
        passo: "Sinais iguais: positivo. 6x6=36.",
        dica: "Negativo x Negativo = Positivo."
    },
    {
        id: "T3Q32", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Regra de Sinais",
        display: "Sinal do produto de 3 números negativos:",
        botoes: ["Negativo", "Positivo", "Depende", "Zero"], res: "Negativo",
        passo: "3 sinais de menos (ímpar) resulta em negativo.",
        dica: "Quantidade ímpar = Negativo."
    },
    {
        id: "T3Q33", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Divisão",
        display: "(−56) ÷ 8 = ?",
        botoes: ["−7", "7", "−48", "48"], res: "−7",
        passo: "56 / 8 = 7. Sinais diferentes = negativo.",
        dica: "Sinais diferentes dá menos."
    },
    {
        id: "T3Q34", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Expressão",
        display: "(−4) × 3 + (−2) × (−5) = ?",
        botoes: ["−2", "2", "−22", "22"], res: "−2",
        passo: "−12 + 10 = −2.",
        dica: "Resolva as mults primeiro."
    },
    {
        id: "T3Q35", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "(−2)⁵ = ?",
        botoes: ["−32", "32", "−10", "10"], res: "−32",
        passo: "Expoente 5 é ímpar, resultado negativo. 2⁵ = 32.",
        dica: "Ímpar mantém o menos."
    },
    {
        id: "T3Q36", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Problema",
        display: "Perda de 15 pontos em 6 rodadas:",
        botoes: ["−90", "90", "−21", "21"], res: "−90",
        passo: "(-15) x 6 = -90.",
        dica: "Perda é sinal negativo."
    },
    {
        id: "T3Q37", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Divisão",
        display: "(−144) ÷ (−12) = ?",
        botoes: ["12", "−12", "132", "−132"], res: "12",
        passo: "144 / 12 = 12. Sinais iguais = positivo.",
        dica: "Menos com menos dá mais."
    },
    {
        id: "T3Q38", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Expressão",
        display: "[(−3) × (−4)] ÷ (−6) = ?",
        botoes: ["−2", "2", "−72", "72"], res: "−2",
        passo: "12 / -6 = -2.",
        dica: "Colchete primeiro."
    },
    {
        id: "T3Q39", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação",
        display: "Qual o valor de (−1)¹⁰⁰?",
        botoes: ["1", "-1", "0", "100"], res: "1",
        passo: "Expoente par resulta em 1.",
        dica: "Par vira positivo."
    },
    {
        id: "T3Q40", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Problema",
        display: "Queda de 3°C por hora em 8 horas:",
        botoes: ["−24°C", "24°C", "−11°C", "11°C"], res: "−24°C",
        passo: "(-3) x 8 = -24.",
        dica: "Queda é variação negativa."
    }
];
