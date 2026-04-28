// js/data/questions/trilha3.js

export const trilha3 = [
    // === BLOCO 1: REGRA DE SINAIS - MULTIPLICAÇÃO E DIVISÃO (1 a 10) ===
    {
        id: "T3Q01", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "(-5) × (-3) = ?", 
        botoes: ["-15", "15", "-8", "8"], res: "15", 
        passo: "Sinais iguais na multiplicação sempre resultam em um número positivo. 5 x 3 = 15.", 
        dica: "O inimigo (-) do meu inimigo (-) é meu amigo (+)."
    },
    {
        id: "T3Q02", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Divisão de Inteiros",
        display: "(-20) ÷ 4 = ?", 
        botoes: ["5", "-5", "-16", "16"], res: "-5", 
        passo: "Sinais diferentes na divisão resultam em um número negativo. 20 / 4 = 5.", 
        dica: "O inimigo (-) do meu amigo (+) é meu inimigo (-)."
    },
    {
        id: "T3Q03", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "7 × (-2) = ?", 
        botoes: ["-14", "14", "-5", "5"], res: "-14", 
        passo: "Um número positivo vezes um negativo resulta em negativo.", 
        dica: "Amigo (+) do inimigo (-) é inimigo (-)."
    },
    {
        id: "T3Q04", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Divisão de Inteiros",
        display: "(-30) ÷ (-6) = ?", 
        botoes: ["-5", "5", "-36", "36"], res: "5", 
        passo: "Divisão de dois números negativos resulta em um quociente positivo.", 
        dica: "Menos dividido por menos dá mais!"
    },
    {
        id: "T3Q05", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "(-1) × (-1) × (-1) = ?", 
        botoes: ["1", "-1", "3", "-3"], res: "-1", 
        passo: "(-1 x -1) dá +1. Depois, (+1 x -1) volta a ser -1.", 
        dica: "Quantidade ímpar de sinais de menos resulta em negativo."
    },
    {
        id: "T3Q06", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "(-10) × 0 = ?", 
        botoes: ["-10", "10", "0", "1"], res: "0", 
        passo: "Qualquer número multiplicado por zero é sempre zero, não importa o sinal.", 
        dica: "O zero é o elemento nulo da multiplicação."
    },
    {
        id: "T3Q07", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "Qual destas multiplicações resulta em um número POSITIVO?", 
        botoes: ["(-2) x (-4)", "3 x (-5)", "(-8) x 1", "0 x (-6)"], res: "(-2) x (-4)", 
        passo: "Apenas a multiplicação de dois sinais iguais (negativos, neste caso) resulta em positivo.", 
        dica: "Procure sinais iguais."
    },
    {
        id: "T3Q08", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Divisão de Inteiros",
        display: "(-100) ÷ (-10) = ?", 
        botoes: ["-10", "10", "-90", "90"], res: "10", 
        passo: "Menos com menos dá mais. 100 dividido por 10 é 10.", 
        dica: "Corte os zeros e verifique o sinal."
    },
    {
        id: "T3Q09", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Multiplicação de Inteiros",
        display: "(-4) × 5 = ?", 
        botoes: ["20", "-20", "1", "-9"], res: "-20", 
        passo: "Diferentes sinais? Resultado negativo. 4 x 5 = 20.", 
        dica: "Inimigo do amigo é..."
    },
    {
        id: "T3Q10", t: 3, tipo: "sinais", bncc: "EF07MA04", bncc_desc: "Operações com Inteiros",
        display: "Qual o sinal do resultado de: (-1) x (-2) x (-3) x (-4)?", 
        botoes: ["Positivo (+)", "Negativo (-)", "Zero", "Neutro"], res: "Positivo (+)", 
        passo: "Temos 4 sinais negativos. Como 4 é par, o resultado final é positivo.", 
        dica: "Conte os sinais de menos: se for par, dá mais; se for ímpar, dá menos."
    },

    // === BLOCO 2: OPERAÇÕES MISTAS E PARÊNTESES (11 a 20) ===
    {
        id: "T3Q11", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "2 + 3 × (-4) = ?", 
        botoes: ["-20", "-10", "10", "-14"], res: "-10", 
        passo: "Primeiro multiplicamos: 3 x (-4) = -12. Depois somamos: 2 + (-12) = -10.", 
        dica: "Multiplicação vem antes da soma!"
    },
    {
        id: "T3Q12", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "(-10) + (-5) × 2 = ?", 
        botoes: ["-30", "-20", "0", "-15"], res: "-20", 
        passo: "Multiplicação primeiro: (-5) x 2 = -10. Depois: (-10) + (-10) = -20.", 
        dica: "Cuidado: não faça a soma antes da multiplicação."
    },
    {
        id: "T3Q13", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "( -8 + 2 ) × 3 = ?", 
        botoes: ["-18", "18", "-30", "30"], res: "-18", 
        passo: "Primeiro o parênteses: -8 + 2 = -6. Depois multiplicamos: -6 x 3 = -18.", 
        dica: "Parênteses são a prioridade máxima!"
    },
    {
        id: "T3Q14", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "15 ÷ (-3) + 2 = ?", 
        botoes: ["-3", "3", "-7", "7"], res: "-3", 
        passo: "Divisão primeiro: 15 / -3 = -5. Depois: -5 + 2 = -3.", 
        dica: "A ordem importa: Divisão antes da adição."
    },
    {
        id: "T3Q15", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "(-2) × (-3) - 10 = ?", 
        botoes: ["-4", "4", "-16", "16"], res: "-4", 
        passo: "Multiplicação: (-2) x (-3) = 6. Depois: 6 - 10 = -4.", 
        dica: "Menos com menos dá mais na multiplicação!"
    },
    {
        id: "T3Q16", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "Qual o valor de: 5 - (-3) ?", 
        botoes: ["2", "8", "-8", "-2"], res: "8", 
        passo: "Subtrair um negativo é o mesmo que somar o seu oposto: 5 + 3 = 8.", 
        dica: "Menos com menos 'gruda' e vira mais."
    },
    {
        id: "T3Q17", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "(-1) - (-5) = ?", 
        botoes: ["-6", "4", "-4", "6"], res: "4", 
        passo: "Vira uma soma: -1 + 5 = 4.", 
        dica: "O sinal de menos na frente do parênteses inverte quem está dentro."
    },
    {
        id: "T3Q18", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "(-4) × ( 5 - 8 ) = ?", 
        botoes: ["12", "-12", "52", "-52"], res: "12", 
        passo: "Parênteses: 5 - 8 = -3. Multiplicação: (-4) x (-3) = 12.", 
        dica: "Resolva o 'segredo' dentro dos parênteses primeiro."
    },
    {
        id: "T3Q19", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "10 + (-2) × (-5) = ?", 
        botoes: ["0", "20", "40", "-20"], res: "20", 
        passo: "Multiplicação: (-2) x (-5) = 10. Soma: 10 + 10 = 20.", 
        dica: "Lembre-se da hierarquia das operações."
    },
    {
        id: "T3Q20", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Operações Mistas",
        display: "(-18) ÷ 2 - (-5) = ?", 
        botoes: ["-4", "-14", "4", "14"], res: "-4", 
        passo: "Divisão: -18 / 2 = -9. Expressão: -9 + 5 = -4.", 
        dica: "Transforme a subtração de negativo em adição."
    },

    // === BLOCO 3: POTENCIAÇÃO COM INTEIROS (21 a 30) ===
    {
        id: "T3Q21", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação de Inteiros",
        display: "(-3)² = ?", 
        botoes: ["-9", "9", "-6", "6"], res: "9", 
        passo: "(-3) x (-3) = 9. Toda base negativa elevada a expoente PAR fica positiva.", 
        dica: "Par vira positivo!"
    },
    {
        id: "T3Q22", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação de Inteiros",
        display: "(-2)³ = ?", 
        botoes: ["8", "-8", "6", "-6"], res: "-8", 
        passo: "(-2) x (-2) x (-2) = -8. Expoente ÍMPAR mantém o sinal da base.", 
        dica: "Três sinais de menos resultam em menos."
    },
    {
        id: "T3Q23", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação de Inteiros",
        display: "(-5)¹ = ?", 
        botoes: ["5", "-5", "1", "-1"], res: "-5", 
        passo: "Qualquer número elevado a 1 é ele mesmo.", 
        dica: "O expoente 1 é o espelho."
    },
    {
        id: "T3Q24", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação de Inteiros",
        display: "(-10)⁰ = ?", 
        botoes: ["1", "-1", "0", "-10"], res: "1", 
        passo: "Todo número (exceto zero) elevado a zero é igual a 1.", 
        dica: "Regra fundamental das potências."
    },
    {
        id: "T3Q25", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação de Inteiros",
        display: "Qual o resultado de: - 3² (sem parênteses)?", 
        botoes: ["9", "-9", "6", "-6"], res: "-9", 
        passo: "Sem parênteses, o sinal de menos não faz parte da potência. Fazemos 3² e mantemos o menos: -9.", 
        dica: "Cuidado! O parênteses faz toda a diferença aqui."
    },
    {
        id: "T3Q26", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação de Inteiros",
        display: "(-1)¹⁰⁰ = ?", 
        botoes: ["1", "-1", "100", "-100"], res: "1", 
        passo: "Base -1 elevada a expoente par resulta em 1 positivo.", 
        dica: "100 é par ou ímpar?"
    },
    {
        id: "T3Q27", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação de Inteiros",
        display: "(-1)⁹⁹ = ?", 
        botoes: ["1", "-1", "99", "-99"], res: "-1", 
        passo: "Base -1 elevada a expoente ímpar resulta em -1.", 
        dica: "99 é ímpar!"
    },
    {
        id: "T3Q28", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação de Inteiros",
        display: "Qual é o valor de: (-4)² + (-2)³ ?", 
        botoes: ["24", "8", "-24", "16"], res: "8", 
        passo: "(-4)² = 16. (-2)³ = -8. A conta: 16 + (-8) = 8.", 
        dica: "Resolva cada potência separadamente."
    },
    {
        id: "T3Q29", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação de Inteiros",
        display: "Se x = -2, qual o valor de x²?", 
        botoes: ["4", "-4", "2", "-2"], res: "4", 
        passo: "Substituindo x por -2, temos (-2)², que é 4.", 
        dica: "Elevar ao quadrado é multiplicar por si mesmo."
    },
    {
        id: "T3Q30", t: 3, tipo: "aritmetica", bncc: "EF07MA04", bncc_desc: "Potenciação de Inteiros",
        display: "A expressão (-2)⁴ resulta em um número:", 
        botoes: ["Positivo", "Negativo", "Zero", "Primo"], res: "Positivo", 
        passo: "Como o expoente 4 é par, o resultado será positivo (16).", 
        dica: "Olhe sempre para o expoente!"
    }
];
