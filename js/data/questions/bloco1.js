/**
 * bloco1.js — Inteiros: Soma e Subtração (EF07MA03)
 * 40 questões fixas + 20 geradas dinamicamente
 */

// ── BANCO FIXO ────────────────────────────────────────────
const questoesFixas = [
    // RETA NUMÉRICA (tipo visual com canvas)
    { id:"T1Q01", tipo:"reta", bncc:"EF07MA03", bncc_desc:"Adição na Reta Numérica", display:"(-3) + 5 = ?", botoes:["2","8","-2","-8"], res:"2", passo:"Comece em -3, ande 5 para a direita: chega ao 2.", dica:"Na reta numérica, somar é andar para a direita.", a:-3, b:5 },
    { id:"T1Q02", tipo:"reta", bncc:"EF07MA03", bncc_desc:"Adição na Reta Numérica", display:"(-4) + (-3) = ?", botoes:["-7","7","1","-1"], res:"-7", passo:"Sinais iguais: some e mantenha o sinal. 4+3=7, resultado -7.", dica:"Dois negativos: some e coloque sinal negativo.", a:-4, b:-3 },
    { id:"T1Q03", tipo:"reta", bncc:"EF07MA03", bncc_desc:"Subtração na Reta Numérica", display:"5 - 8 = ?", botoes:["-3","3","13","-13"], res:"-3", passo:"5 - 8: como 8 > 5, o resultado é negativo. 8-5=3, logo -3.", dica:"Quando o subtraendo é maior, o resultado é negativo.", a:5, b:-8 },
    { id:"T1Q04", tipo:"reta", bncc:"EF07MA03", bncc_desc:"Subtração na Reta Numérica", display:"(-6) + 9 = ?", botoes:["3","-3","15","-15"], res:"3", passo:"Sinais diferentes: subtraia e use o sinal do maior. 9-6=3 (positivo).", dica:"Sinais diferentes: subtraia e use o sinal do número com maior valor absoluto.", a:-6, b:9 },
    { id:"T1Q05", tipo:"reta", bncc:"EF07MA03", bncc_desc:"Subtração na Reta Numérica", display:"2 - 7 = ?", botoes:["-5","5","9","-9"], res:"-5", passo:"2 - 7 = -5. Subtraindo um número maior, o resultado é negativo.", dica:"Subtrair um número maior resulta em número negativo.", a:2, b:-7 },
    { id:"T1Q06", tipo:"reta", bncc:"EF07MA03", bncc_desc:"Subtração — menos com menos", display:"4 - (-3) = ?", botoes:["7","1","-7","-1"], res:"7", passo:"Menos com menos vira mais: 4 - (-3) = 4 + 3 = 7.", dica:"Subtrair um negativo é o mesmo que somar o positivo.", a:4, b:3 },
    { id:"T1Q07", tipo:"reta", bncc:"EF07MA03", bncc_desc:"Soma de inteiros", display:"(-8) + 8 = ?", botoes:["0","16","-16","1"], res:"0", passo:"Todo número somado ao seu oposto resulta em zero.", dica:"Oposto de -8 é +8. Soma = zero.", a:-8, b:8 },
    { id:"T1Q08", tipo:"reta", bncc:"EF07MA03", bncc_desc:"Soma de inteiros", display:"(-5) + (-5) = ?", botoes:["-10","0","10","-25"], res:"-10", passo:"(-5) + (-5) = -10. Sinais iguais: some e mantenha o sinal.", dica:"Dois negativos iguais: dobre o valor com sinal negativo.", a:-5, b:-5 },

    // CONTEXTUALIZADAS
    { id:"T1Q09", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Inteiros em Contexto", display:"Um elevador está no 3º andar e desce 7 andares. Em que andar está?", botoes:["-4","4","-10","10"], res:"-4", passo:"3 - 7 = -4. O andar negativo representa subterrâneo.", dica:"Descer é subtrair; andar negativo é abaixo do térreo." },
    { id:"T1Q10", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Inteiros em Contexto", display:"A temperatura era -8°C e subiu 13°C. Qual a temperatura final?", botoes:["5°C","-5°C","21°C","-21°C"], res:"5°C", passo:"-8 + 13 = 5°C.", dica:"Subir temperatura é adicionar graus." },
    { id:"T1Q11", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Inteiros em Contexto", display:"Um mergulhador está a -30 m. Sobe 18 m. Qual a profundidade agora?", botoes:["-12 m","12 m","-48 m","48 m"], res:"-12 m", passo:"-30 + 18 = -12 m. Ainda abaixo da superfície.", dica:"Subir diminui o valor negativo da profundidade." },
    { id:"T1Q12", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Inteiros em Contexto", display:"Malba Tahan tinha 200 moedas, gastou 350 e recebeu 80. Qual o saldo?", botoes:["-70","70","-270","530"], res:"-70", passo:"200 - 350 + 80 = -70. Ficou devendo 70 moedas.", dica:"Receber é +, gastar é −." },

    // OPERAÇÕES DIRETAS
    { id:"T1Q13", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Adição de Inteiros", display:"(-7) + (-4) = ?", botoes:["-11","-3","11","3"], res:"-11", passo:"Sinais iguais: some e mantenha o sinal. 7+4=11, resultado -11.", dica:"Negativos com negativos: some os valores e coloque o sinal negativo." },
    { id:"T1Q14", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Subtração de Inteiros", display:"5 - (-3) = ?", botoes:["8","2","-8","-2"], res:"8", passo:"Menos com menos vira mais: 5 - (-3) = 5 + 3 = 8.", dica:"Subtrair negativo = somar positivo." },
    { id:"T1Q15", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Adição de Inteiros", display:"3 + (-9) = ?", botoes:["-6","6","12","-12"], res:"-6", passo:"Sinais diferentes: 9-3=6. O maior é negativo: resultado -6.", dica:"Sinais diferentes: subtraia e use o sinal do número com maior valor absoluto." },
    { id:"T1Q16", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Valor Absoluto", display:"Qual é o valor absoluto de -15?", botoes:["15","-15","0","150"], res:"15", passo:"|-15| = 15. Valor absoluto é sempre positivo.", dica:"Distância ao zero nunca é negativa." },
    { id:"T1Q17", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Ordenação de Inteiros", display:"Qual número é MAIOR: -2 ou -8?", botoes:["-2","-8","São iguais","Impossível comparar"], res:"-2", passo:"-2 está à direita de -8 na reta numérica. -2 > -8.", dica:"Na reta, mais à direita é maior." },
    { id:"T1Q18", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Adição de Inteiros", display:"(-8) + 3 - (-2) = ?", botoes:["-3","3","-7","7"], res:"-3", passo:"-8+3=-5. -5-(-2)=-5+2=-3.", dica:"Resolva da esquerda para a direita." },
    { id:"T1Q19", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Oposto", display:"Qual é o oposto de -17?", botoes:["17","-17","0","1/17"], res:"17", passo:"O oposto de -17 é +17. Troca o sinal.", dica:"Oposto: troca o sinal." },
    { id:"T1Q20", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Ordenação", display:"Ordene do MENOR ao MAIOR: -3, 0, -7, 2, -1", botoes:["-7<-3<-1<0<2","-3<-7<0<-1<2","0<-1<2<-3<-7","2>0>-1>-3>-7"], res:"-7<-3<-1<0<2", passo:"Na reta numérica: -7, -3, -1, 0, 2.", dica:"Quanto mais negativo, menor o número." },
    { id:"T1Q21", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Expressão com Inteiros", display:"(-4) + (-9) + 3 = ?", botoes:["-10","10","-16","16"], res:"-10", passo:"(-4)+(-9)=-13. -13+3=-10.", dica:"Some os negativos primeiro, depois combine com o positivo." },
    { id:"T1Q22", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Subtração de Inteiros", display:"15 - (-6) = ?", botoes:["21","9","-21","-9"], res:"21", passo:"15-(-6)=15+6=21.", dica:"Subtrair negativo vira soma." },
    { id:"T1Q23", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Expressão com Inteiros", display:"(-12) - (-5) + (-3) = ?", botoes:["-10","10","-20","4"], res:"-10", passo:"-12-(-5)=-12+5=-7. -7+(-3)=-10.", dica:"Trate cada operação com cuidado." },
    { id:"T1Q24", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Inteiros em Contexto", display:"Uma empresa: lucro de R$500 em jan, prejuízo de R$800 em fev, lucro de R$200 em mar. Resultado final?", botoes:["-R$100","R$100","-R$300","R$1500"], res:"-R$100", passo:"500-800+200=-100. Prejuízo de R$100.", dica:"Lucro é positivo, prejuízo é negativo." },
    { id:"T1Q25", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Valor Absoluto", display:"Qual é o valor absoluto de -23?", botoes:["23","-23","0","1/23"], res:"23", passo:"|-23|=23.", dica:"Valor absoluto = distância ao zero." },

    // DESAFIOS EXTRAS
    { id:"T1Q26", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Adição de Inteiros", display:"(-100) + 47 = ?", botoes:["-53","53","-147","147"], res:"-53", passo:"100-47=53. O maior é negativo: -53.", dica:"Sinais diferentes: subtraia e use o sinal do maior." },
    { id:"T1Q27", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Subtração de Inteiros", display:"(-20) - 15 = ?", botoes:["-35","35","-5","5"], res:"-35", passo:"-20-15=-35. Some os valores e mantenha o negativo.", dica:"Negativo menos positivo: some e fica negativo." },
    { id:"T1Q28", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Inteiros em Contexto", display:"Placar: 7ºA tem 12 pts e perde 18 pts. Qual o placar?", botoes:["-6","6","30","-30"], res:"-6", passo:"12-18=-6.", dica:"Pontuação pode ficar negativa em jogos de penalidade." },
    { id:"T1Q29", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Adição de Inteiros", display:"(-1) + (-2) + (-3) + (-4) = ?", botoes:["-10","10","-24","24"], res:"-10", passo:"1+2+3+4=10. Todos negativos: -10.", dica:"Some todos os valores e coloque o sinal negativo." },
    { id:"T1Q30", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Subtração — menos com menos", display:"(-3) - (-10) = ?", botoes:["7","-7","13","-13"], res:"7", passo:"-3-(-10)=-3+10=7.", dica:"Menos com menos vira mais." },
    { id:"T1Q31", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Expressão com Inteiros", display:"10 - 3 + (-8) + 2 = ?", botoes:["1","-1","3","-3"], res:"1", passo:"10-3=7. 7+(-8)=-1. -1+2=1.", dica:"Resolva passo a passo da esquerda para direita." },
    { id:"T1Q32", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Inteiros em Contexto", display:"A conta bancária tinha R$50. Foram feitos saques de R$30 e R$40 e um depósito de R$20. Qual o saldo?", botoes:["-R$0","R$0","R$140","-R$20"], res:"R$0", passo:"50-30-40+20=0.", dica:"Saque é subtrair, depósito é somar." },
    { id:"T1Q33", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Adição de Inteiros", display:"(-50) + 50 = ?", botoes:["0","100","-100","50"], res:"0", passo:"Um número mais seu oposto sempre resulta em zero.", dica:"Oposto de -50 é +50." },
    { id:"T1Q34", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Subtração de Inteiros", display:"0 - (-7) = ?", botoes:["7","-7","0","14"], res:"7", passo:"0-(-7)=0+7=7.", dica:"Subtrair negativo de zero é o mesmo que o positivo." },
    { id:"T1Q35", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Inteiros em Contexto", display:"O ponto mais fundo do Mar Morto é -430 m. O Monte Everest tem 8.849 m. Qual a diferença de altitude?", botoes:["9.279 m","8.419 m","8.849 m","430 m"], res:"9.279 m", passo:"8849-(-430)=8849+430=9279 m.", dica:"Diferença de altitude envolve subtração de inteiros." },
    { id:"T1Q36", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Adição de Inteiros", display:"Qual é a soma de todos os inteiros de -3 a 3?", botoes:["0","6","-6","21"], res:"0", passo:"-3+(-2)+(-1)+0+1+2+3=0. Cada par de opostos cancela.", dica:"Opostos somam zero." },
    { id:"T1Q37", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Expressão com Inteiros", display:"[(-4) + 6] - [3 + (-8)] = ?", botoes:["7","-7","5","-5"], res:"7", passo:"[-4+6]=2. [3+(-8)]=-5. 2-(-5)=2+5=7.", dica:"Resolva cada colchete separado antes de operar." },
    { id:"T1Q38", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Inteiros em Contexto", display:"Em 3 jogadas, um time marcou: +6, -4 e +2 pontos. Qual o total?", botoes:["4","-4","8","12"], res:"4", passo:"6+(-4)+2=4.", dica:"Some os resultados com seus sinais." },
    { id:"T1Q39", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Subtração de Inteiros", display:"(-300) - (-150) = ?", botoes:["-150","150","-450","450"], res:"-150", passo:"-300-(-150)=-300+150=-150.", dica:"Menos com menos vira mais." },
    { id:"T1Q40", tipo:"aritmetica", bncc:"EF07MA03", bncc_desc:"Inteiros em Contexto", display:"Placar de golfe: -3, -1, +2, -2. Qual o total? (No golfe, menor é melhor!)", botoes:["-4","4","-8","8"], res:"-4", passo:"-3+(-1)+2+(-2)=-4.", dica:"Some todos com seus sinais." }
];

// ── GERADOR DINÂMICO ──────────────────────────────────────
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarQuestoes(qtd = 20) {
    const questoes = [];
    for (let i = 0; i < qtd; i++) {
        const a = randint(-20, 20);
        const b = randint(-20, 20);
        const res = a + b;
        const opcoes = [...new Set([
            String(res), String(-res),
            String(res + randint(1, 4)),
            String(res - randint(1, 4))
        ])].slice(0, 4);
        while (opcoes.length < 3) opcoes.push(String(randint(-40, 40)));
        questoes.push({
            id: `B1G${String(i + 1).padStart(3, '0')}`,
            tipo: 'reta', bncc: 'EF07MA03', bncc_desc: 'Adição e Subtração de Inteiros',
            display: `(${a}) + (${b}) = ?`,
            botoes: opcoes,
            res: String(res),
            passo: `${a} + ${b} = ${res}.`,
            dica: 'Observe os sinais e use a reta numérica.',
            a, b
        });
    }
    return questoes;
}

export const bloco1 = [...questoesFixas, ...gerarQuestoes(20)];
