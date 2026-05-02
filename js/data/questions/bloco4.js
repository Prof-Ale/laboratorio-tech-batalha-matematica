/**
 * bloco4.js — Frações, Decimais e Porcentagem (EF06MA07/08/09)
 * 35 questões fixas + 15 geradas dinamicamente
 */

const questoesFixas = [
    // CONCEITO E REPRESENTAÇÃO
    { id:"T4Q01", tipo:"aritmetica", bncc:"EF06MA07", bncc_desc:"Conceito de Fração", display:"Uma pizza foi dividida em 8 fatias iguais. João comeu 3. Qual fração representa o que João comeu?", botoes:["3/8","8/3","3/5","5/8"], res:"3/8", passo:"João comeu 3 de 8 partes. Numerador=partes comidas, denominador=total.", dica:"Fração = partes que queremos / total de partes iguais." },
    { id:"T4Q02", tipo:"aritmetica", bncc:"EF06MA07", bncc_desc:"Frações Equivalentes", display:"Qual fração é EQUIVALENTE a 1/2?", botoes:["3/6","2/3","1/4","3/4"], res:"3/6", passo:"1×3 / 2×3 = 3/6. Frações equivalentes representam a mesma quantidade.", dica:"Multiplique numerador e denominador pelo mesmo número." },
    { id:"T4Q03", tipo:"aritmetica", bncc:"EF06MA07", bncc_desc:"Simplificação", display:"Qual é a forma SIMPLIFICADA de 6/9?", botoes:["2/3","3/4","1/2","3/5"], res:"2/3", passo:"MDC(6,9)=3. 6÷3 / 9÷3 = 2/3.", dica:"Divida numerador e denominador pelo MDC." },
    { id:"T4Q04", tipo:"aritmetica", bncc:"EF06MA07", bncc_desc:"Comparação", display:"Qual é a MAIOR fração?", botoes:["3/4","2/3","1/2","5/8"], res:"3/4", passo:"Com denominador 24: 3/4=18/24, 2/3=16/24, 1/2=12/24, 5/8=15/24. Maior: 3/4.", dica:"Encontre denominador comum e compare numeradores." },
    { id:"T4Q05", tipo:"aritmetica", bncc:"EF06MA07", bncc_desc:"Comparação", display:"Ordene do MENOR ao MAIOR: 1/2, 1/3, 1/4", botoes:["1/4 < 1/3 < 1/2","1/2 < 1/3 < 1/4","1/3 < 1/4 < 1/2","São iguais"], res:"1/4 < 1/3 < 1/2", passo:"Com numeradores iguais, maior denominador = menor fração.", dica:"Mesmo numerador: quanto maior o denominador, menor a fração." },
    { id:"T4Q06", tipo:"aritmetica", bncc:"EF06MA07", bncc_desc:"Fração Imprópria", display:"Qual destes é MAIOR que 1?", botoes:["7/5","3/7","2/8","4/9"], res:"7/5", passo:"7/5=1,4. Numerador maior que denominador → fração maior que 1.", dica:"Fração imprópria: numerador > denominador." },

    // ADIÇÃO E SUBTRAÇÃO — MESMO DENOMINADOR
    { id:"T4Q07", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Adição de Frações", display:"3/8 + 2/8 = ?", botoes:["5/8","5/16","6/8","1/2"], res:"5/8", passo:"Mesmo denominador: some os numeradores. 3+2=5. Resultado: 5/8.", dica:"Denominadores iguais: some apenas os numeradores." },
    { id:"T4Q08", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Subtração de Frações", display:"5/6 − 2/6 = ?", botoes:["3/6","3/0","7/6","1/2"], res:"3/6", passo:"5-2=3. Resultado: 3/6 (=1/2).", dica:"Denominadores iguais: subtraia os numeradores." },
    { id:"T4Q09", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Adição de Frações", display:"Uma receita pede 1/4 de açúcar e 2/4 de farinha. Total?", botoes:["3/4","3/8","1/2","1"], res:"3/4", passo:"1/4 + 2/4 = 3/4.", dica:"Mesmo denominador." },

    // ADIÇÃO E SUBTRAÇÃO — DENOMINADORES DIFERENTES
    { id:"T4Q10", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Adição com MMC", display:"1/2 + 1/4 = ?", botoes:["3/4","2/6","1/3","2/4"], res:"3/4", passo:"MMC(2,4)=4. 1/2=2/4. 2/4+1/4=3/4.", dica:"Converta para denominador comum." },
    { id:"T4Q11", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Adição com MMC", display:"1/3 + 1/2 = ?", botoes:["5/6","2/5","2/6","3/5"], res:"5/6", passo:"MMC(3,2)=6. 1/3=2/6, 1/2=3/6. Soma: 5/6.", dica:"MMC de 2 e 3 é 6." },
    { id:"T4Q12", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Subtração com MMC", display:"3/4 − 1/2 = ?", botoes:["1/4","2/2","1/2","2/8"], res:"1/4", passo:"MMC(4,2)=4. 1/2=2/4. 3/4-2/4=1/4.", dica:"Converta 1/2 para quartos." },
    { id:"T4Q13", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Adição com MMC", display:"1/6 + 1/3 = ?", botoes:["3/6","2/9","1/2","2/6"], res:"3/6", passo:"MMC(6,3)=6. 1/3=2/6. 1/6+2/6=3/6.", dica:"3 já divide 6." },
    { id:"T4Q14", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Adição com MMC", display:"2/5 + 1/10 = ?", botoes:["5/10","3/15","4/10","1/2"], res:"5/10", passo:"MMC(5,10)=10. 2/5=4/10. 4/10+1/10=5/10.", dica:"10 já é múltiplo de 5." },
    { id:"T4Q15", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Adição com MMC", display:"2/5 + 1/2 = ?", botoes:["9/10","3/7","4/10","5/7"], res:"9/10", passo:"MMC(5,2)=10. 2/5=4/10, 1/2=5/10. Soma: 9/10.", dica:"MMC de 5 e 2 é 10." },

    // FRAÇÃO DE UM NÚMERO
    { id:"T4Q16", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Fração de um Número", display:"Quanto é 1/4 de 20?", botoes:["5","4","8","10"], res:"5", passo:"20÷4=5.", dica:"Divida pelo denominador e multiplique pelo numerador." },
    { id:"T4Q17", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Fração de um Número", display:"Uma turma tem 30 alunos. 2/3 são meninas. Quantas meninas?", botoes:["20","10","15","18"], res:"20", passo:"30÷3=10. 10×2=20.", dica:"Divida por 3 primeiro, depois multiplique por 2." },
    { id:"T4Q18", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Fração de um Número", display:"Em uma caixa com 24 frutas, 3/8 são maçãs. Quantas maçãs?", botoes:["9","8","6","12"], res:"9", passo:"24÷8=3. 3×3=9.", dica:"Divida 24 por 8 e multiplique por 3." },

    // FRAÇÃO, DECIMAL E PORCENTAGEM
    { id:"T4Q19", tipo:"aritmetica", bncc:"EF06MA09", bncc_desc:"Fração e Decimal", display:"A fração 1/2 em decimal é:", botoes:["0,5","0,2","0,12","5,0"], res:"0,5", passo:"1÷2=0,5.", dica:"Divida numerador pelo denominador." },
    { id:"T4Q20", tipo:"aritmetica", bncc:"EF06MA09", bncc_desc:"Fração e Decimal", display:"3/4 em decimal é:", botoes:["0,75","0,34","0,43","1,75"], res:"0,75", passo:"3÷4=0,75.", dica:"Divida 3 por 4." },
    { id:"T4Q21", tipo:"aritmetica", bncc:"EF06MA09", bncc_desc:"Porcentagem", display:"50% equivale a qual fração simplificada?", botoes:["1/2","5/10","1/4","2/3"], res:"1/2", passo:"50%=50/100=1/2.", dica:"Porcentagem é fração com denominador 100." },
    { id:"T4Q22", tipo:"aritmetica", bncc:"EF06MA09", bncc_desc:"Porcentagem", display:"25% de 80 é igual a:", botoes:["20","25","40","8"], res:"20", passo:"25%=1/4. 80÷4=20.", dica:"25% é o mesmo que 1/4." },
    { id:"T4Q23", tipo:"aritmetica", bncc:"EF06MA09", bncc_desc:"Fração e Decimal", display:"O decimal 0,25 equivale a qual fração simplificada?", botoes:["1/4","2/5","1/2","1/5"], res:"1/4", passo:"0,25=25/100=1/4.", dica:"Escreva como fração de 100 e simplifique." },
    { id:"T4Q24", tipo:"aritmetica", bncc:"EF06MA09", bncc_desc:"Porcentagem", display:"Em uma prova de 20 questões, um aluno acertou 15. Qual foi sua porcentagem de acerto?", botoes:["75%","80%","70%","60%"], res:"75%", passo:"15/20=3/4=0,75=75%.", dica:"Divide acertos pelo total e multiplica por 100." },
    { id:"T4Q25", tipo:"aritmetica", bncc:"EF06MA09", bncc_desc:"Porcentagem", display:"75% em fração simplificada é:", botoes:["3/4","7/5","75/10","15/20"], res:"3/4", passo:"75/100. MDC(75,100)=25. 75÷25=3, 100÷25=4. Logo: 3/4.", dica:"Simplifique dividindo pelo MDC." },

    // EXTRAS CONTEXTUALIZADAS
    { id:"T4Q26", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Fração de um Número", display:"Malba Tahan tinha 120 problemas de matemática. Resolveu 5/6 deles. Quantos resolveu?", botoes:["100","96","60","20"], res:"100", passo:"120÷6=20. 20×5=100.", dica:"5/6 de 120: divide por 6, multiplica por 5." },
    { id:"T4Q27", tipo:"aritmetica", bncc:"EF06MA07", bncc_desc:"Frações Equivalentes", display:"Qual das frações é equivalente a 2/5?", botoes:["4/10","4/9","2/10","1/5"], res:"4/10", passo:"2×2 / 5×2 = 4/10.", dica:"Multiplique numerador e denominador pelo mesmo número." },
    { id:"T4Q28", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Subtração de Frações", display:"Uma jornada de 8 horas. Trabalhou 3/4 do turno. Quantas horas trabalhou?", botoes:["6","5","4","7"], res:"6", passo:"3/4 de 8: 8÷4=2. 2×3=6 horas.", dica:"Fração de um número." },
    { id:"T4Q29", tipo:"aritmetica", bncc:"EF06MA07", bncc_desc:"Comparação", display:"Qual número está entre 1/2 e 3/4 na reta numérica?", botoes:["5/8","1/4","7/8","3/8"], res:"5/8", passo:"1/2=4/8, 3/4=6/8. Entre eles: 5/8.", dica:"Converta para oitavos e compare." },
    { id:"T4Q30", tipo:"aritmetica", bncc:"EF06MA09", bncc_desc:"Fração e Decimal", display:"Qual é o valor de 3/10 em decimal?", botoes:["0,3","0,03","3,0","0,33"], res:"0,3", passo:"3/10=0,3. Denominador 10: uma casa decimal.", dica:"Denominador 10 = uma casa decimal." },
    { id:"T4Q31", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Adição com MMC", display:"1/4 + 3/8 = ?", botoes:["5/8","4/12","2/8","1/2"], res:"5/8", passo:"MMC(4,8)=8. 1/4=2/8. 2/8+3/8=5/8.", dica:"Converta para oitavos." },
    { id:"T4Q32", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Adição de Frações", display:"7/10 + 2/10 = ?", botoes:["9/10","9/20","1","10/10"], res:"9/10", passo:"7+2=9. Logo: 9/10.", dica:"Mesmo denominador: some os numeradores." },
    { id:"T4Q33", tipo:"aritmetica", bncc:"EF06MA09", bncc_desc:"Porcentagem", display:"10% de 150 é:", botoes:["15","10","20","1,5"], res:"15", passo:"10%=1/10. 150÷10=15.", dica:"10% é sempre um décimo do número." },
    { id:"T4Q34", tipo:"aritmetica", bncc:"EF06MA08", bncc_desc:"Subtração com MMC", display:"5/6 − 1/3 = ?", botoes:["3/6","4/6","1/6","2/3"], res:"3/6", passo:"1/3=2/6. 5/6-2/6=3/6.", dica:"Converta 1/3 para sextos." },
    { id:"T4Q35", tipo:"aritmetica", bncc:"EF06MA07", bncc_desc:"Simplificação", display:"A fração 8/12 simplificada é:", botoes:["2/3","4/6","1/3","3/4"], res:"2/3", passo:"MDC(8,12)=4. 8÷4=2, 12÷4=3. Logo: 2/3.", dica:"Divida pelo MDC." },
];

function gerarQuestoes(qtd = 15) {
    const pares = [[2,4],[3,6],[4,8],[4,12],[3,9],[6,12],[5,10],[2,6],[4,6],[3,12],[6,9],[4,10],[5,15],[2,8],[3,4]];
    return pares.slice(0,qtd).map(([d1,d2],i) => {
        const mmc = (a,b) => { let r=Math.max(a,b); while(r%Math.min(a,b)!==0) r+=Math.max(a,b); return r; };
        const den = mmc(d1,d2);
        const n1 = Math.floor(Math.random()*(d1-1))+1;
        const n2 = Math.floor(Math.random()*(d2-1))+1;
        const r1 = n1*(den/d1), r2 = n2*(den/d2);
        const soma = r1+r2;
        const mdc = (a,b) => b===0?a:mdc(b,a%b);
        const g = mdc(soma,den);
        const res = `${soma/g}/${den/g}`;
        return {
            id:`B4G${String(i+1).padStart(3,'0')}`,
            tipo:'aritmetica', bncc:'EF06MA08', bncc_desc:'Adição de Frações',
            display:`${n1}/${d1} + ${n2}/${d2} = ?`,
            botoes:[res, `${soma+1}/${den}`, `${r1}/${den}`, `${n1+n2}/${d1+d2}`].slice(0,4),
            res, passo:`MMC(${d1},${d2})=${den}. Converta e some os numeradores.`,
            dica:'Encontre o MMC dos denominadores e converta as frações.'
        };
    });
}

export const bloco4 = [...questoesFixas, ...gerarQuestoes(15)];
