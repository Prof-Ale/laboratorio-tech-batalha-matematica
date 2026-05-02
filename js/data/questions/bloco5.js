/**
 * bloco5.js — MMC, MDC e Divisibilidade Avançada (EF06MA05 / EF06MA06)
 * 30 questões fixas + 20 geradas dinamicamente
 */

const questoesFixas = [
    // CRITÉRIOS DE DIVISIBILIDADE
    { id:"T5Q01", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade", display:"O número 2.340 é divisível por 5?", botoes:["Sim","Não","Às vezes","Depende do contexto"], res:"Sim", passo:"Termina em 0: divisível por 5 (e também por 2 e 10).", dica:"Divisível por 5: termina em 0 ou 5." },
    { id:"T5Q02", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade por 3", display:"126 é divisível por 3?", botoes:["Sim","Não","Só por 9","Depende"], res:"Sim", passo:"1+2+6=9. Divisível por 3.", dica:"Some os algarismos. Resultado múltiplo de 3: número também é." },
    { id:"T5Q03", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade por 9", display:"315 é divisível por 9?", botoes:["Sim","Não","Só por 3","Depende"], res:"Sim", passo:"3+1+5=9. Divisível por 9.", dica:"Soma dos algarismos múltipla de 9: número também é." },
    { id:"T5Q04", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Números Primos", display:"Qual destes é PRIMO?", botoes:["13","15","21","27"], res:"13", passo:"13: divisível só por 1 e 13. Os outros têm mais divisores.", dica:"Primo: exatamente 2 divisores." },
    { id:"T5Q05", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisores", display:"Quantos divisores tem o número 12?", botoes:["6","4","8","3"], res:"6", passo:"Divisores de 12: 1,2,3,4,6,12. São 6.", dica:"Liste todos os divisores." },
    { id:"T5Q06", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Fatoração Primos", display:"Decomposição de 12 em fatores primos:", botoes:["2²×3","2×6","3×4","2×3×3"], res:"2²×3", passo:"12÷2=6. 6÷2=3. 3 é primo. Logo: 2²×3.", dica:"Divida pelo menor primo possível." },
    { id:"T5Q07", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Fatoração Primos", display:"Decomposição de 60 em fatores primos:", botoes:["2²×3×5","2×3×5","2³×5","2×30"], res:"2²×3×5", passo:"60÷2=30. 30÷2=15. 15÷3=5. Logo: 2²×3×5.", dica:"Divida pelos primos em ordem crescente." },
    { id:"T5Q08", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade por 4", display:"5.472 é divisível por 4?", botoes:["Sim","Não","Só por 2","Impossível saber"], res:"Sim", passo:"Dois últimos dígitos: 72. 72÷4=18. Exato: sim.", dica:"Critério do 4: verifique os dois últimos algarismos." },

    // MDC
    { id:"T5Q09", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"MDC de 12 e 18:", botoes:["6","3","9","36"], res:"6", passo:"Divisores comuns de 12 e 18: 1,2,3,6. Maior: 6.", dica:"MDC: maior divisor comum aos dois números." },
    { id:"T5Q10", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"MDC de 24 e 36:", botoes:["12","6","18","4"], res:"12", passo:"24=2³×3. 36=2²×3². MDC=2²×3=12.", dica:"Fatores comuns com o menor expoente." },
    { id:"T5Q11", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"MDC de 15 e 25:", botoes:["5","3","15","75"], res:"5", passo:"15=3×5. 25=5². Fator comum: 5.", dica:"Fator comum mínimo." },
    { id:"T5Q12", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC — Problema", display:"24 balas e 36 figurinhas em grupos iguais sem sobra. Maior número de grupos?", botoes:["12","6","8","4"], res:"12", passo:"MDC(24,36)=12.", dica:"Distribuição igual: MDC." },
    { id:"T5Q13", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"MDC de 100 e 75:", botoes:["25","5","50","15"], res:"25", passo:"100=2²×5². 75=3×5². MDC=5²=25.", dica:"Fator comum com menor expoente." },
    { id:"T5Q14", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC — Problema", display:"48 lápis e 64 canetas em grupos iguais. Maior número de grupos?", botoes:["16","8","4","32"], res:"16", passo:"MDC(48,64)=16.", dica:"Distribuição igual: MDC." },
    { id:"T5Q15", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"MDC de dois primos diferentes é sempre:", botoes:["1","2","O menor","O produto"], res:"1", passo:"Primos diferentes: único divisor comum é 1.", dica:"Números primos só são divisíveis por 1 e por eles mesmos." },

    // MMC
    { id:"T5Q16", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"MMC de 4 e 6:", botoes:["12","24","8","2"], res:"12", passo:"Múltiplos de 4: 4,8,12... Múltiplos de 6: 6,12... MMC=12.", dica:"Menor múltiplo comum." },
    { id:"T5Q17", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"MMC de 3 e 5:", botoes:["15","8","30","2"], res:"15", passo:"3 e 5 são primos entre si. MMC=3×5=15.", dica:"Primos entre si: MMC é o produto." },
    { id:"T5Q18", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"MMC de 6 e 9:", botoes:["18","54","3","27"], res:"18", passo:"6=2×3. 9=3². MMC=2×3²=18.", dica:"Todos os fatores com maior expoente." },
    { id:"T5Q19", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC — Problema", display:"Dois ônibus partem juntos. Um passa a cada 20 min, outro a cada 30 min. Em quantos min passarão juntos de novo?", botoes:["60 min","50 min","10 min","600 min"], res:"60 min", passo:"MMC(20,30)=60.", dica:"Encontro periódico: MMC." },
    { id:"T5Q20", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"Menor número divisível por 2, 3 e 4 ao mesmo tempo:", botoes:["12","24","6","9"], res:"12", passo:"MMC(2,3,4)=12.", dica:"MMC dos três." },
    { id:"T5Q21", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC — Problema", display:"Três luzes piscam a cada 3, 4 e 6 segundos. Em quantos seg voltarão a piscar juntas?", botoes:["12 s","24 s","6 s","72 s"], res:"12 s", passo:"MMC(3,4,6)=12.", dica:"MMC dos três períodos." },
    { id:"T5Q22", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"MMC de 8 e 12:", botoes:["24","48","16","4"], res:"24", passo:"8=2³. 12=2²×3. MMC=2³×3=24.", dica:"Maior expoente de cada fator." },
    { id:"T5Q23", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"Relação MMC e MDC", display:"MMC=36, MDC=6. Um número é 12. Qual é o outro?", botoes:["18","24","6","36"], res:"18", passo:"MMC×MDC=produto. 36×6=216. 216÷12=18.", dica:"MMC × MDC = a × b." },
    { id:"T5Q24", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC — Problema", display:"Dois atletas treinam juntos hoje. Um descansa a cada 4 dias, outro a cada 6 dias. Em quantos dias treinarão juntos de novo?", botoes:["12 dias","24 dias","2 dias","10 dias"], res:"12 dias", passo:"MMC(4,6)=12.", dica:"Encontro periódico: MMC." },
    { id:"T5Q25", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC — Problema", display:"Três semáforos: 30s, 45s e 60s. Em quantos seg abrirão juntos?", botoes:["180 s","90 s","135 s","60 s"], res:"180 s", passo:"MMC(30,45,60)=180.", dica:"MMC dos três." },

    // INTEGRADOS
    { id:"T5Q26", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade", display:"O número 5.472 é divisível por 2, 3 e 4 ao mesmo tempo?", botoes:["Sim, pelos três","Só por 2","Só por 2 e 4","Só por 2 e 3"], res:"Sim, pelos três", passo:"Par (÷2): sim. 5+4+7+2=18, múltiplo de 3: sim. 72÷4=18: sim.", dica:"Aplique cada critério separadamente." },
    { id:"T5Q27", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC — Problema", display:"Um professor quer dividir 48 lápis e 60 folhas em kits iguais sem sobrar. Máximo de kits?", botoes:["12","6","4","24"], res:"12", passo:"MDC(48,60)=12.", dica:"Kits iguais sem sobra: MDC." },
    { id:"T5Q28", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Números Primos", display:"Quantos números primos existem entre 1 e 20?", botoes:["8","6","9","7"], res:"8", passo:"Primos: 2,3,5,7,11,13,17,19. São 8.", dica:"Lembre-se: 1 não é primo." },
    { id:"T5Q29", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade", display:"1.332 é divisível por 9?", botoes:["Sim","Não","Só por 3","Depende"], res:"Sim", passo:"1+3+3+2=9. Divisível por 9.", dica:"Soma dos algarismos." },
    { id:"T5Q30", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"MDC de 100 e 250:", botoes:["50","25","10","100"], res:"50", passo:"100=2²×5². 250=2×5³. MDC=2×5²=50.", dica:"Fatores comuns com menor expoente." },
];

function mmc(a, b) {
    const mdc = (x, y) => y === 0 ? x : mdc(y, x % y);
    return (a * b) / mdc(a, b);
}

function gerarQuestoes(qtd = 20) {
    const pares = [[2,3],[3,4],[4,6],[5,10],[6,8],[2,5],[3,9],[4,10],[6,9],[8,12],[2,4],[5,6],[3,7],[4,5],[6,10],[3,8],[2,9],[5,8],[4,7],[6,7]];
    return pares.slice(0,qtd).map(([a,b],i) => {
        const res = mmc(a,b);
        const ops = [...new Set([String(res), String(res*2), String(a*b), String(Math.min(a,b))])].slice(0,4);
        return {
            id:`B5G${String(i+1).padStart(3,'0')}`,
            tipo:'aritmetica', bncc:'EF06MA05', bncc_desc:'MMC',
            display:`MMC de ${a} e ${b}:`,
            botoes:ops, res:String(res),
            passo:`O menor múltiplo comum de ${a} e ${b} é ${res}.`,
            dica:'Liste os múltiplos e encontre o menor que aparece nos dois.'
        };
    });
}

export const bloco5 = [...questoesFixas, ...gerarQuestoes(20)];
