// js/data/questions/trilha4.js

export const trilha4 = [
    // === BLOCO 1: EQUAÇÕES SIMPLES (x + a = b, ax = b) (1 a 10) ===
    {
        id: "T4Q01", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Simples",
        display: "Qual o valor de x na equação: x + 5 = 12 ?", 
        botoes: ["7", "17", "-7", "6"], res: "7", 
        passo: "Para isolar o x, passamos o 5 para o outro lado com a operação inversa (subtraindo): 12 - 5 = 7.", 
        dica: "Pense na operação inversa. Qual número mais 5 resulta em 12?"
    },
    {
        id: "T4Q02", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Simples",
        display: "Resolva: y - 3 = 8", 
        botoes: ["5", "11", "-5", "24"], res: "11", 
        passo: "O 3 está subtraindo, então passa para o outro lado somando: 8 + 3 = 11.", 
        dica: "Que número, quando lhe tiramos 3, resulta em 8?"
    },
    {
        id: "T4Q03", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Simples",
        display: "Qual o valor de m em: 4m = 20 ?", 
        botoes: ["24", "16", "5", "-5"], res: "5", 
        passo: "O 4 está a multiplicar a letra m. A operação inversa é a divisão: 20 ÷ 4 = 5.", 
        dica: "Lembre-se: um número colado a uma letra significa multiplicação!"
    },
    {
        id: "T4Q04", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Simples",
        display: "Resolva: x ÷ 2 = 6", 
        botoes: ["3", "12", "8", "4"], res: "12", 
        passo: "Se o 2 está a dividir, ele passa para o outro lado a multiplicar: 6 × 2 = 12.", 
        dica: "Qual é o número que, cortado ao meio, dá 6?"
    },
    {
        id: "T4Q05", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Simples",
        display: "Descubra o valor de x: x + 10 = 5", 
        botoes: ["15", "5", "-5", "-15"], res: "-5", 
        passo: "Isolando o x: x = 5 - 10. O resultado entra nos números negativos: -5.", 
        dica: "Cuidado com o sinal na hora de passar o 10 para o outro lado!"
    },
    {
        id: "T4Q06", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Simples",
        display: "Resolva: 3y = -15", 
        botoes: ["5", "-5", "-12", "-18"], res: "-5", 
        passo: "Passamos o 3 a dividir: -15 ÷ 3 = -5. (Regra de sinais: menos com mais dá menos).", 
        dica: "Três vezes quem que dá um resultado negativo?"
    },
    {
        id: "T4Q07", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Simples",
        display: "Qual o valor de x em: -2x = 8 ?", 
        botoes: ["-4", "4", "10", "-10"], res: "-4", 
        passo: "Passamos o -2 inteiro a dividir: 8 ÷ (-2) = -4.", 
        dica: "O número que passa a dividir leva o seu próprio sinal junto com ele!"
    },
    {
        id: "T4Q08", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Simples",
        display: "Resolva: -x = 7", 
        botoes: ["7", "-7", "0", "1"], res: "-7", 
        passo: "Multiplicamos ambos os lados por -1 para a letra ficar positiva: x = -7.", 
        dica: "A letra nunca deve terminar negativa. Inverta o sinal dos dois lados!"
    },
    {
        id: "T4Q09", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Simples",
        display: "Ache o x: 5x = 0", 
        botoes: ["5", "-5", "0", "1"], res: "0", 
        passo: "Zero dividido por qualquer número (neste caso, o 5) é sempre zero.", 
        dica: "Que número vezes 5 dá rigorosamente nada?"
    },
    {
        id: "T4Q10", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Simples",
        display: "Se x ÷ 3 = -4, então x vale:", 
        botoes: ["-1", "-12", "12", "-7"], res: "-12", 
        passo: "O 3 passa a multiplicar: -4 × 3 = -12.", 
        dica: "A operação inversa da divisão é a multiplicação."
    },

    // === BLOCO 2: EQUAÇÕES COMPOSTAS (ax + b = c) (11 a 20) ===
    {
        id: "T4Q11", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Compostas",
        display: "Resolva a equação: 2x + 1 = 9", 
        botoes: ["4", "5", "8", "10"], res: "4", 
        passo: "Primeiro, passamos o 1 a subtrair (2x = 8). Depois, passamos o 2 a dividir (x = 4).", 
        dica: "Comece passando o que está solto (soma/subtração), só depois o que está grudado no x."
    },
    {
        id: "T4Q12", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Compostas",
        display: "Qual o valor de y em: 3y - 2 = 10 ?", 
        botoes: ["4", "12", "6", "-4"], res: "4", 
        passo: "Soma-se 2 ao outro lado (3y = 12). Divide-se por 3 (y = 4).", 
        dica: "Operação inversa passo a passo. Resolva primeiro o -2."
    },
    {
        id: "T4Q13", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Compostas",
        display: "Resolva: 5x + 5 = 30", 
        botoes: ["5", "7", "25", "-5"], res: "5", 
        passo: "5x = 30 - 5 (fica 5x = 25). Passando a dividir: x = 25 ÷ 5 = 5.", 
        dica: "Isole os termos com 'x' de um lado e os números soltos do outro."
    },
    {
        id: "T4Q14", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Compostas",
        display: "Encontre o valor de m: 2m - 7 = -1", 
        botoes: ["-4", "3", "4", "-3"], res: "3", 
        passo: "O -7 passa a somar: 2m = -1 + 7 (fica 2m = 6). Dividindo por 2: m = 3.", 
        dica: "Cuidado ao somar um número negativo com um positivo."
    },
    {
        id: "T4Q15", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Compostas",
        display: "Resolva: 4x + 8 = 0", 
        botoes: ["2", "-2", "0", "-4"], res: "-2", 
        passo: "O 8 passa negativo: 4x = -8. O 4 passa a dividir: x = -2.", 
        dica: "Como o resultado é zero, um dos dois termos precisa de ser negativo."
    },
    {
        id: "T4Q16", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações (x dos dois lados)",
        display: "Resolva: 3x - 1 = x + 5", 
        botoes: ["2", "3", "4", "6"], res: "3", 
        passo: "Letras para um lado, números para o outro: 3x - x = 5 + 1. (Fica 2x = 6). Logo, x = 3.", 
        dica: "Sempre que um termo saltar o sinal de igual, inverta a sua operação."
    },
    {
        id: "T4Q17", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Compostas",
        display: "Ache o x: -2x + 4 = 10", 
        botoes: ["3", "-3", "7", "-7"], res: "-3", 
        passo: "-2x = 10 - 4 (fica -2x = 6). Multiplicando por -1: 2x = -6. Logo, x = -3.", 
        dica: "Não se esqueça de inverter o sinal da letra no final, ou passar o -2 a dividir."
    },
    {
        id: "T4Q18", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações com Fração",
        display: "Resolva: (x ÷ 2) + 3 = 8", 
        botoes: ["5", "10", "2.5", "16"], res: "10", 
        passo: "Passe o 3 a subtrair (x/2 = 5). Passe o 2 a multiplicar (x = 5 × 2 = 10).", 
        dica: "Desmonte a equação de fora para dentro."
    },
    {
        id: "T4Q19", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações Compostas",
        display: "Encontre o x: 5 - 2x = 1", 
        botoes: ["2", "-2", "3", "4"], res: "2", 
        passo: "-2x = 1 - 5 (fica -2x = -4). Multiplicando por -1 (fica 2x = 4). Então, x = 2.", 
        dica: "O sinal de menos pertence ao 2x. Deixe-o aí colado até ao fim!"
    },
    {
        id: "T4Q20", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Equações com Parênteses",
        display: "Resolva: 3(x + 1) = 15", 
        botoes: ["4", "5", "6", "14"], res: "4", 
        passo: "Pode passar o 3 a dividir logo (x + 1 = 5) e depois isolar o x (x = 5 - 1 = 4).", 
        dica: "O 3 está a multiplicar todo o parênteses. Que tal passá-lo a dividir logo de início?"
    },

    // === BLOCO 3: PROBLEMAS CONTEXTUALIZADOS (Traduzir para o Matematês) (21 a 30) ===
    {
        id: "T4Q21", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Modelagem Algébrica",
        display: "O dobro de um número é igual a 18. Qual é esse número?", 
        botoes: ["8", "9", "36", "16"], res: "9", 
        passo: "Tradução: 2x = 18. Portanto, x = 18 ÷ 2 = 9.", 
        dica: "'O dobro' significa multiplicar por 2."
    },
    {
        id: "T4Q22", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Modelagem Algébrica",
        display: "Um número somado a 5 resulta em 12. Qual é o número?", 
        botoes: ["17", "7", "-7", "6"], res: "7", 
        passo: "Tradução: x + 5 = 12. x = 12 - 5 = 7.", 
        dica: "Chame 'um número desconhecido' de x."
    },
    {
        id: "T4Q23", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Modelagem Algébrica",
        display: "O triplo de um número menos 2 é igual a 13. Que número é esse?", 
        botoes: ["5", "15", "4", "6"], res: "5", 
        passo: "Tradução: 3x - 2 = 13. Passa o 2 a somar (3x = 15). Divide (x = 5).", 
        dica: "Monte a equação passo a passo: 3x ... - 2 ... = 13."
    },
    {
        id: "T4Q24", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Modelagem Algébrica",
        display: "A metade de um número é 20. Qual é esse número?", 
        botoes: ["10", "40", "30", "5"], res: "40", 
        passo: "Tradução: x ÷ 2 = 20. Passa o 2 a multiplicar: x = 40.", 
        dica: "Cuidado para não dividir o 20!"
    },
    {
        id: "T4Q25", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Modelagem Algébrica",
        display: "Ana tem o dobro da idade de Bruno. Somando as duas idades temos 30. Qual a idade de Bruno?", 
        botoes: ["10", "15", "20", "5"], res: "10", 
        passo: "Idade de Bruno = x. Idade de Ana = 2x. (x + 2x = 30). Logo, 3x = 30. Bruno tem 10 anos.", 
        dica: "O Bruno é o x. A Ana é o 2x. Some os dois."
    },
    {
        id: "T4Q26", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Modelagem Algébrica",
        display: "Pensei num número, multipliquei por 4 e o resultado foi -24. Em que número pensei?", 
        botoes: ["-6", "6", "-20", "8"], res: "-6", 
        passo: "Tradução: 4x = -24. Passando a dividir, x = -6.", 
        dica: "Um resultado negativo na multiplicação indica que o número pensado era negativo."
    },
    {
        id: "T4Q27", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Modelagem Algébrica",
        display: "Um número menos o seu dobro é igual a -5. Qual é o número?", 
        botoes: ["5", "-5", "10", "-10"], res: "5", 
        passo: "Tradução: x - 2x = -5. (Fica -x = -5). Multiplicando por -1, fica x = 5.", 
        dica: "Chame o número de x e o dobro de 2x."
    },
    {
        id: "T4Q28", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Modelagem Algébrica",
        display: "O dobro de um número MAIS ele mesmo resulta em 15. Qual é o número?", 
        botoes: ["3", "5", "10", "15"], res: "5", 
        passo: "Tradução: 2x + x = 15. Simplificando: 3x = 15. Logo, x = 5.", 
        dica: "2 maçãs mais 1 maçã dá 3 maçãs."
    },
    {
        id: "T4Q29", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Modelagem Algébrica",
        display: "Comprei 3 cadernos iguais e sobrou R$ 2 de uma nota de R$ 20. Qual o preço de cada caderno?", 
        botoes: ["R$ 5", "R$ 6", "R$ 7", "R$ 8"], res: ["6", "R$ 6", "R$ 6,00"], 
        passo: "Equação: 3x + 2 = 20. (3x = 18). Então cada caderno custou R$ 6.", 
        dica: "Tire o troco primeiro para saber quanto custaram os 3 cadernos juntos."
    },
    {
        id: "T4Q30", t: 4, tipo: "algebra", bncc: "EF07MA18", bncc_desc: "Modelagem Algébrica",
        display: "A soma de dois números seguidos (consecutivos) é 21. Qual é o MENOR deles?", 
        botoes: ["10", "11", "9", "12"], res: "10", 
        passo: "Menor = x. Maior = x+1. (x + x + 1 = 21). (2x = 20). O menor número é 10.", 
        dica: "Dois números consecutivos são como x e (x + 1)."
    }
];
