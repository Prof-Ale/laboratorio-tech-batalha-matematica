/**
 * bloco3.js — Inteiros: Multiplicação, Divisão e Expressões (EF07MA04)
 * 40 questões fixas + 20 geradas dinamicamente
 */

const questoesFixas = [
    // REGRA DE SINAIS
    { id:"T3Q01", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Regra de Sinais", display:"(-6) × 4 = ?", botoes:["-24","24","-10","10"], res:"-24", passo:"Sinais diferentes: resultado negativo. 6×4=24, logo -24.", dica:"Positivo × Negativo = Negativo." },
    { id:"T3Q02", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Regra de Sinais", display:"(-5) × (-3) = ?", botoes:["15","-15","-8","8"], res:"15", passo:"Sinais iguais: resultado positivo. 5×3=15.", dica:"Negativo × Negativo = Positivo." },
    { id:"T3Q03", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Regra de Sinais", display:"(-20) ÷ 4 = ?", botoes:["-5","5","-16","16"], res:"-5", passo:"Sinais diferentes: negativo. 20÷4=5, logo -5.", dica:"Sinais diferentes na divisão: resultado negativo." },
    { id:"T3Q04", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Regra de Sinais", display:"(-12) ÷ (-3) = ?", botoes:["4","-4","-9","9"], res:"4", passo:"Sinais iguais: positivo. 12÷3=4.", dica:"Negativo ÷ Negativo = Positivo." },
    { id:"T3Q05", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Regra de Sinais", display:"Qual é o sinal do produto de três números negativos?", botoes:["Negativo","Positivo","Depende dos valores","Zero"], res:"Negativo", passo:"(-)×(-)=(+). (+)×(-)=(-). Número ímpar de negativos → negativo.", dica:"Conte os negativos: ímpar → negativo, par → positivo." },
    { id:"T3Q06", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Potenciação", display:"(-2)³ = ?", botoes:["-8","8","-6","6"], res:"-8", passo:"(-2)×(-2)×(-2). Três fatores: expoente ímpar → negativo. 2³=8, logo -8.", dica:"Expoente ímpar com base negativa: resultado negativo." },
    { id:"T3Q07", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Potenciação", display:"(-1)¹⁰⁰ = ?", botoes:["1","-1","0","100"], res:"1", passo:"Expoente 100 é par: resultado positivo. (-1)¹⁰⁰=1.", dica:"Expoente par com base negativa: resultado positivo." },
    { id:"T3Q08", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Potenciação", display:"(-2)⁵ = ?", botoes:["-32","32","-10","10"], res:"-32", passo:"5 fatores de -2. Expoente ímpar → negativo. 2⁵=32, logo -32.", dica:"Expoente ímpar com base negativa: resultado negativo." },
    { id:"T3Q09", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Multiplicação", display:"(-6) × (-6) = ?", botoes:["36","-36","12","-12"], res:"36", passo:"Sinais iguais: positivo. 6×6=36.", dica:"Negativo × Negativo = Positivo." },
    { id:"T3Q10", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Divisão", display:"(-56) ÷ 8 = ?", botoes:["-7","7","-48","48"], res:"-7", passo:"56÷8=7. Sinais diferentes: -7.", dica:"Sinais diferentes: negativo." },

    // EXPRESSÕES
    { id:"T3Q11", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"3 × (-2) + 5 = ?", botoes:["-1","1","-11","11"], res:"-1", passo:"3×(-2)=-6. -6+5=-1.", dica:"Multiplicação antes da adição." },
    { id:"T3Q12", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"(-2)² × 3 = ?", botoes:["12","-12","-4","4"], res:"12", passo:"(-2)²=4 (positivo). 4×3=12.", dica:"(-2)² é positivo: base negativa com expoente par." },
    { id:"T3Q13", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"(-4) × 3 + (-2) × (-5) = ?", botoes:["-2","2","-22","22"], res:"-2", passo:"(-4)×3=-12. (-2)×(-5)=+10. -12+10=-2.", dica:"Calcule cada multiplicação primeiro." },
    { id:"T3Q14", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"[(-3) × (-4)] ÷ (-6) = ?", botoes:["-2","2","-72","72"], res:"-2", passo:"(-3)×(-4)=12. 12÷(-6)=-2.", dica:"Resolva o colchete primeiro." },
    { id:"T3Q15", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"(-3) × 4 × (-2) = ?", botoes:["24","-24","-9","9"], res:"24", passo:"(-3)×4=-12. (-12)×(-2)=24.", dica:"Dois negativos se cancelam." },
    { id:"T3Q16", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"(2³ - 3²) × (-1) = ?", botoes:["1","-1","17","-17"], res:"1", passo:"2³=8. 3²=9. 8-9=-1. (-1)×(-1)=1.", dica:"Calcule as potências, depois o parêntese, depois multiplique." },
    { id:"T3Q17", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"5 - (-3) × 2 = ?", botoes:["11","-1","-11","1"], res:"11", passo:"(-3)×2=-6. 5-(-6)=5+6=11.", dica:"Multiplicação primeiro, depois a subtração." },
    { id:"T3Q18", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"(-36) ÷ (-9) × (-2) = ?", botoes:["-8","8","-72","72"], res:"-8", passo:"(-36)÷(-9)=4. 4×(-2)=-8.", dica:"Da esquerda para direita." },

    // CONTEXTUALIZADAS
    { id:"T3Q19", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Multiplicação em Contexto", display:"Um jogador perde 15 pontos por rodada. Após 6 rodadas, qual a variação total?", botoes:["-90","90","-21","21"], res:"-90", passo:"(-15)×6=-90. Perdeu 90 pontos.", dica:"Perda é negativo." },
    { id:"T3Q20", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Divisão em Contexto", display:"A temperatura de um freezer cai 3°C por hora. Após 8 horas, qual foi a variação total?", botoes:["-24°C","24°C","-11°C","11°C"], res:"-24°C", passo:"(-3)×8=-24°C.", dica:"Queda de temperatura é variação negativa." },
    { id:"T3Q21", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Multiplicação em Contexto", display:"Uma dívida de R$50 ao mês por 4 meses. Qual a variação no saldo?", botoes:["-R$200","R$200","-R$54","R$54"], res:"-R$200", passo:"(-50)×4=-200.", dica:"Dívida é negativa." },
    { id:"T3Q22", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Divisão em Contexto", display:"(-144) ÷ (-12) = ?", botoes:["12","-12","132","-132"], res:"12", passo:"144÷12=12. Sinais iguais: positivo.", dica:"Negativo ÷ Negativo = Positivo." },
    { id:"T3Q23", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Multiplicação", display:"(-3) × (-3) × (-3) = ?", botoes:["-27","27","-9","9"], res:"-27", passo:"(-3)²=9. 9×(-3)=-27. Expoente ímpar: negativo.", dica:"Três negativos: resultado negativo." },
    { id:"T3Q24", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Regra de Sinais", display:"Qual é o sinal de (-1)⁹⁹?", botoes:["Negativo, pois 99 é ímpar","Positivo, pois a base é -1","Zero","Depende"], res:"Negativo, pois 99 é ímpar", passo:"(-1) com expoente ímpar = -1.", dica:"Expoente ímpar com base negativa → negativo." },
    { id:"T3Q25", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"2 × (-3) + 4 × (-1) = ?", botoes:["-10","10","-2","2"], res:"-10", passo:"2×(-3)=-6. 4×(-1)=-4. -6+(-4)=-10.", dica:"Calcule as multiplicações primeiro." },

    // DESAFIOS
    { id:"T3Q26", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"(-2)⁴ - (-2)³ = ?", botoes:["24","8","16","-24"], res:"24", passo:"(-2)⁴=16. (-2)³=-8. 16-(-8)=16+8=24.", dica:"Calcule cada potência e depois subtraia." },
    { id:"T3Q27", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Multiplicação", display:"(-1) × (-2) × (-3) × (-4) = ?", botoes:["24","-24","10","-10"], res:"24", passo:"4 fatores negativos: resultado positivo. 1×2×3×4=24.", dica:"Número par de negativos → positivo." },
    { id:"T3Q28", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Divisão", display:"(-1000) ÷ (-25) = ?", botoes:["40","-40","975","-975"], res:"40", passo:"1000÷25=40. Sinais iguais: positivo.", dica:"Sinais iguais na divisão: positivo." },
    { id:"T3Q29", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"(-5)² + (-5)³ = ?", botoes:["-100","100","0","150"], res:"-100", passo:"(-5)²=25. (-5)³=-125. 25+(-125)=-100.", dica:"Calcule cada potência separadamente." },
    { id:"T3Q30", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Multiplicação em Contexto", display:"Em uma competição, cada erro desconta 8 pontos. Um aluno errou 5 questões. Variação no placar?", botoes:["-40","40","-13","13"], res:"-40", passo:"(-8)×5=-40.", dica:"Desconto é negativo." },
    { id:"T3Q31", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"4 × (-3) ÷ (-6) = ?", botoes:["2","-2","72","-72"], res:"2", passo:"4×(-3)=-12. (-12)÷(-6)=2.", dica:"Da esquerda para direita, um passo de cada vez." },
    { id:"T3Q32", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Potenciação", display:"(-10)² = ?", botoes:["100","-100","20","-20"], res:"100", passo:"(-10)²=(-10)×(-10)=100.", dica:"Expoente par com base negativa: positivo." },
    { id:"T3Q33", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"(-3 + 7) × (-2) = ?", botoes:["-8","8","-20","20"], res:"-8", passo:"-3+7=4. 4×(-2)=-8.", dica:"Parênteses primeiro." },
    { id:"T3Q34", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Divisão em Contexto", display:"Uma câmara frigorífica perde 4°C por hora. Em quantas horas chegará a -28°C partindo de 0°C?", botoes:["7 h","4 h","28 h","-7 h"], res:"7 h", passo:"(-28)÷(-4)=7 horas.", dica:"Divida a queda total pela queda por hora." },
    { id:"T3Q35", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"[(-6) ÷ 2] × [(-4) ÷ (-2)] = ?", botoes:["-6","6","-12","12"], res:"-6", passo:"(-6)÷2=-3. (-4)÷(-2)=2. (-3)×2=-6.", dica:"Resolva cada colchete primeiro." },
    { id:"T3Q36", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Regra de Sinais", display:"(-7) × 3 ÷ (-3) = ?", botoes:["7","-7","63","-63"], res:"7", passo:"(-7)×3=-21. (-21)÷(-3)=7.", dica:"Da esquerda para a direita." },
    { id:"T3Q37", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Multiplicação em Contexto", display:"Numa guerra de pontos, o 7ºA ganhou 12 pts, o 7ºB perdeu o dobro. Quantos pontos o 7ºB tem?", botoes:["-24","24","-12","12"], res:"-24", passo:"Perdeu o dobro de 12: (-2)×12=-24.", dica:"Perder o dobro: multiplique por -2." },
    { id:"T3Q38", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"(-4)² - 4² = ?", botoes:["0","32","-32","16"], res:"0", passo:"(-4)²=16. 4²=16. 16-16=0.", dica:"(-4)² e 4² dão o mesmo resultado: 16." },
    { id:"T3Q39", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Potenciação", display:"(-3)⁰ = ?", botoes:["1","-1","0","3"], res:"1", passo:"Qualquer número (diferente de zero) elevado a 0 é igual a 1.", dica:"a⁰=1 para todo a≠0." },
    { id:"T3Q40", tipo:"aritmetica", bncc:"EF07MA04", bncc_desc:"Expressão com Inteiros", display:"(-2) × [3 - (-5)] = ?", botoes:["-16","16","-4","4"], res:"-16", passo:"3-(-5)=3+5=8. (-2)×8=-16.", dica:"Resolva o colchete primeiro." },
];

function randint(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function gerarQuestoes(qtd = 20) {
    const questoes = [];
    for (let i = 0; i < qtd; i++) {
        const a = randint(-12, -2);
        const b = randint(-12, -2) * (Math.random() < 0.5 ? -1 : 1);
        const res = a * b;
        const ops = [...new Set([String(res), String(-res), String(res + randint(1,5)), String(res - randint(1,5))])].slice(0,4);
        questoes.push({
            id: `B3G${String(i+1).padStart(3,'0')}`,
            tipo:'aritmetica', bncc:'EF07MA04', bncc_desc:'Multiplicação de Inteiros',
            display:`(${a}) × (${b}) = ?`,
            botoes: ops, res: String(res),
            passo:`${a} × ${b} = ${res}. ${res > 0 ? 'Sinais iguais: positivo.' : 'Sinais diferentes: negativo.'}`,
            dica:'Multiplique os valores e determine o sinal pela regra.'
        });
    }
    return questoes;
}

export const bloco3 = [...questoesFixas, ...gerarQuestoes(20)];
