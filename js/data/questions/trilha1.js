// js/data/questions/trilha1.js

export const trilha1 = [
    // === BLOCO 1: RETA NUMÉRICA E SOMA/SUBTRAÇÃO (1 a 10) ===
    {
        id: "T1Q01", t: 1, tipo: "reta", bncc: "EF07MA03", bncc_desc: "Soma e Subtração na Reta",
        display: "-3 + 7 = ?", 
        botoes: ["4", "-4", "10", "-10"], res: "4", 
        passo: "Partindo do -3, andamos 7 casas para a direita, chegando ao 4 positivo.", 
        dica: "Soma de positivo move para a <b>direita</b> na reta.", a: -3, b: 7
    },
    {
        id: "T1Q02", t: 1, tipo: "reta", bncc: "EF07MA03", bncc_desc: "Soma e Subtração na Reta",
        display: "2 - 6 = ?", 
        botoes: ["-4", "4", "8", "-8"], res: "-4", 
        passo: "Partindo do 2, andamos 6 casas para a esquerda, passando pelo zero até o -4.", 
        dica: "Subtração move para a <b>esquerda</b> na reta.", a: 2, b: -6
    },
    {
        id: "T1Q03", t: 1, tipo: "reta", bncc: "EF07MA03", bncc_desc: "Soma e Subtração na Reta",
        display: "-1 - 4 = ?", 
        botoes: ["-5", "5", "3", "-3"], res: "-5", 
        passo: "Se já estamos no -1 e subtraímos 4, andamos mais para a esquerda, até o -5.", 
        dica: "Dívida mais dívida, a dívida aumenta!", a: -1, b: -4
    },
    {
        id: "T1Q04", t: 1, tipo: "reta", bncc: "EF07MA03", bncc_desc: "Soma e Subtração na Reta",
        display: "0 - 8 = ?", 
        botoes: ["-8", "8", "0", "1"], res: "-8", 
        passo: "Partindo do zero e andando 8 casas para a esquerda, paramos no -8.", 
        dica: "Tirar algo de zero resulta em um número negativo.", a: 0, b: -8
    },
    {
        id: "T1Q05", t: 1, tipo: "reta", bncc: "EF07MA03", bncc_desc: "Soma e Subtração na Reta",
        display: "-5 + 5 = ?", 
        botoes: ["0", "10", "-10", "-5"], res: "0", 
        passo: "Partindo do -5, ao somar 5 casas voltamos exatamente para a origem (zero).", 
        dica: "Somar um número ao seu oposto sempre dá zero.", a: -5, b: 5
    },
    {
        id: "T1Q06", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Localização na Reta",
        display: "Em relação ao zero, onde fica o número -12 na reta numérica?", 
        botoes: ["À Esquerda", "À Direita", "Acima", "Abaixo"], res: "À Esquerda", 
        passo: "Todos os números inteiros negativos localizam-se à esquerda do zero.", 
        dica: "Pense no eixo horizontal padronizado."
    },
    {
        id: "T1Q07", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Distância na Reta",
        display: "Qual é a distância total entre o -3 e o 2 na reta numérica?", 
        botoes: ["5 casas", "1 casa", "6 casas", "Nenhuma"], res: "5 casas", 
        passo: "Do -3 ao 0 são 3 casas. Do 0 ao 2 são mais 2 casas. Total: 5 casas.", 
        dica: "Conte os 'pulos' passando pelo zero!"
    },
    {
        id: "T1Q08", t: 1, tipo: "reta", bncc: "EF07MA03", bncc_desc: "Soma e Subtração na Reta",
        display: "4 - 7 = ?", 
        botoes: ["-3", "3", "11", "-11"], res: "-3", 
        passo: "Se você tem 4 e tira 7, você passa do zero e fica devendo 3.", 
        dica: "O número negativo é 'mais forte' aqui.", a: 4, b: -7
    },
    {
        id: "T1Q09", t: 1, tipo: "reta", bncc: "EF07MA03", bncc_desc: "Soma e Subtração na Reta",
        display: "-8 + 3 = ?", 
        botoes: ["-5", "5", "-11", "11"], res: "-5", 
        passo: "Devendo 8, você paga 3. Continua devendo 5.", 
        dica: "Movimento de 3 casas para a direita saindo do -8.", a: -8, b: 3
    },
    {
        id: "T1Q10", t: 1, tipo: "reta", bncc: "EF07MA03", bncc_desc: "Soma e Subtração na Reta",
        display: "5 - 5 = ?", 
        botoes: ["0", "10", "-10", "5"], res: "0", 
        passo: "Se tenho 5 e retiro 5, não sobra nada.", 
        dica: "Qualquer número subtraído dele mesmo é zero.", a: 5, b: -5
    },

    // === BLOCO 2: COMPARAÇÃO DE INTEIROS (11 a 18) ===
    {
        id: "T1Q11", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Comparação de Inteiros",
        display: "Qual destes números é o MAIOR?", 
        botoes: ["-2", "-5", "-10", "-20"], res: "-2", 
        passo: "Nos números negativos, quanto mais próximo de zero, MAIOR é o número.", 
        dica: "Qual destas 'dívidas' é a mais fácil de pagar?"
    },
    {
        id: "T1Q12", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Comparação de Inteiros",
        display: "Qual destes números é o MENOR?", 
        botoes: ["-15", "-3", "0", "2"], res: "-15", 
        passo: "O -15 é o que está mais à esquerda na reta numérica, sendo o menor de todos.", 
        dica: "Imagine a temperatura mais fria."
    },
    {
        id: "T1Q13", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Comparação de Inteiros",
        display: "A temperatura em Urupema é de -4°C e em São Joaquim é de -7°C. Qual cidade está MAIS FRIA?", 
        botoes: ["São Joaquim", "Urupema", "Iguais", "Impossível saber"], res: "São Joaquim", 
        passo: "-7 é menor que -4, portanto representa uma temperatura mais baixa (mais fria).", 
        dica: "Menos graus = mais frio."
    },
    {
        id: "T1Q14", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Comparação de Inteiros",
        display: "Comparando saldos bancários: quem está numa situação MELHOR?", 
        botoes: ["João: R$ -10", "Maria: R$ -50", "Ana: R$ -100", "Bia: R$ -20"], res: "João: R$ -10", 
        passo: "João é quem deve menos. -10 é o maior valor entre os negativos listados.", 
        dica: "Quem tem a menor dívida?"
    },
    {
        id: "T1Q15", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Comparação de Inteiros",
        display: "Qual o maior inteiro NEGATIVO possível?", 
        botoes: ["-1", "0", "-99", "-10"], res: "-1", 
        passo: "O -1 é o número negativo que está colado ao zero, sendo o maior deles.", 
        dica: "O zero não é positivo nem negativo!"
    },
    {
        id: "T1Q16", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Comparação de Inteiros",
        display: "Selecione a afirmação VERDADEIRA:", 
        botoes: ["-8 > -12", "-5 > 0", "2 < -4", "-10 > -2"], res: "-8 > -12", 
        passo: "O -8 está à direita do -12 na reta, portanto é maior.", 
        dica: "Lembre-se: a boca do sinal > abre sempre para o maior."
    },
    {
        id: "T1Q17", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Comparação de Inteiros",
        display: "Qual número está exatamente no meio entre -4 e 2 na reta?", 
        botoes: ["-1", "0", "-2", "1"], res: "-1", 
        passo: "A distância de -4 até 2 é 6. A metade é 3. Andando 3 casas a partir do -4, chegamos ao -1.", 
        dica: "Desenhe a reta mentalmente e conte até se encontrarem."
    },
    {
        id: "T1Q18", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Comparação de Inteiros",
        display: "Se x é um número entre -3 e 0, x NÃO pode ser:", 
        botoes: ["-4", "-2", "-1", "-2.5"], res: "-4", 
        passo: "O -4 está fora do intervalo, pois é menor que -3.", 
        dica: "Qual número está mais à esquerda que o -3?"
    },

    // === BLOCO 3: MÓDULO E VALOR ABSOLUTO (19 a 24) ===
    {
        id: "T1Q19", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Módulo de um Número",
        display: "Qual é o valor de: | -9 | ?", 
        botoes: ["9", "-9", "0", "18"], res: "9", 
        passo: "O módulo indica a distância do número até o zero, e distância é sempre positiva.", 
        dica: "As barras verticais 'tiram' o sinal negativo."
    },
    {
        id: "T1Q20", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Módulo de um Número",
        display: "Qual(is) destes números possui(em) módulo igual a 5?", 
        botoes: ["5", "-5", "Ambos", "Nenhum"], res: ["5", "-5", "Ambos"], 
        passo: "Tanto o 5 quanto o -5 estão a exatamente 5 casas de distância do zero.", 
        dica: "Existe mais de um número com a mesma distância para a origem."
    },
    {
        id: "T1Q21", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Módulo de um Número",
        display: "Calcule: | -3 | + | 4 | =", 
        botoes: ["7", "1", "-1", "-7"], res: "7", 
        passo: "O módulo de -3 é 3. O módulo de 4 é 4. Somando os dois: 3 + 4 = 7.", 
        dica: "Resolva as barras primeiro, transformando tudo em positivo, depois some."
    },
    {
        id: "T1Q22", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Módulo de um Número",
        display: "O módulo de um número representa, na matemática, a sua:", 
        botoes: ["Distância até o zero", "Metade", "Raiz quadrada", "Temperatura"], res: "Distância até o zero", 
        passo: "O conceito geométrico de módulo é a distância de um ponto até a origem da reta (o zero).", 
        dica: "Por que o módulo nunca é negativo?"
    },
    {
        id: "T1Q23", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Módulo de um Número",
        display: "Calcule: | 10 | - | -6 | =", 
        botoes: ["4", "16", "-4", "-16"], res: "4", 
        passo: "O módulo de 10 é 10. O módulo de -6 é 6. A conta fica: 10 - 6 = 4.", 
        dica: "Transforme os módulos em números normais antes de subtrair."
    },
    {
        id: "T1Q24", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Módulo de um Número",
        display: "Existe algum número cujo módulo seja negativo? (Ex: |x| = -2)", 
        botoes: ["Não", "Sim", "Só o zero", "Só os ímpares"], res: "Não", 
        passo: "Como o módulo representa distância, não existem distâncias negativas na geometria básica.", 
        dica: "Já ouviu falar de andar -2 metros?"
    },

    // === BLOCO 4: OPOSTOS E SIMÉTRICOS (25 a 30) ===
    {
        id: "T1Q25", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Opostos e Simétricos",
        display: "Qual é o número OPOSTO de 14?", 
        botoes: ["-14", "1/14", "0", "14"], res: "-14", 
        passo: "O oposto (ou simétrico) é o número com o sinal trocado.", 
        dica: "Fica do 'outro lado' do espelho (o zero)."
    },
    {
        id: "T1Q26", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Opostos e Simétricos",
        display: "Qual é o SIMÉTRICO de -27?", 
        botoes: ["27", "-27", "0", "1/27"], res: "27", 
        passo: "Simétrico é o mesmo que oposto. O simétrico de um negativo é positivo.", 
        dica: "Basta trocar o sinal."
    },
    {
        id: "T1Q27", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Opostos e Simétricos",
        display: "O que acontece se somarmos um número com o seu oposto? (Ex: 8 + (-8))", 
        botoes: ["Dá zero", "Fica positivo", "Fica negativo", "Dobra de valor"], res: "Dá zero", 
        passo: "A soma de qualquer número com o seu oposto resulta sempre no elemento neutro: o zero.", 
        dica: "Tenho uma maçã, como uma maçã. O que sobra?"
    },
    {
        id: "T1Q28", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Opostos e Simétricos",
        display: "Qual é o oposto do oposto de -5?", 
        botoes: ["-5", "5", "0", "10"], res: "-5", 
        passo: "O oposto de -5 é 5. O oposto de 5 volta a ser -5.", 
        dica: "Como girar 180 graus duas vezes: volta para o mesmo lugar!"
    },
    {
        id: "T1Q29", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Opostos e Simétricos",
        display: "Se 'y' é o oposto de 100, quem é 'y'?", 
        botoes: ["-100", "100", "0", "-1"], res: "-100", 
        passo: "O oposto de 100 positivo é 100 negativo (-100).", 
        dica: "Basta colocar o sinal de menos."
    },
    {
        id: "T1Q30", t: 1, tipo: "aritmetica", bncc: "EF07MA03", bncc_desc: "Opostos e Simétricos",
        display: "Qual é o número que é oposto dele mesmo?", 
        botoes: ["0", "1", "-1", "Nenhum"], res: "0", 
        passo: "O zero não possui sinal, portanto o oposto do zero é o próprio zero.", 
        dica: "Fica exatamente no 'meio' do espelho!"
    }
];
