/**
 * bloco2.js — Múltiplos, Divisores, MDC e MMC (EF07MA01 / EF06MA05 / EF06MA06)
 * 40 questões fixas + 20 geradas dinamicamente
 */

const questoesFixas = [
    // DIVISIBILIDADE
    { id:"T2Q01", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade por 2 e 5", display:"O número 2.340 é divisível por 2, 5 e 10?", botoes:["Sim, pelos três","Só por 2 e 5","Só por 2","Não é divisível"], res:"Sim, pelos três", passo:"Termina em 0: divisível por 2 (par), por 5 (termina em 0 ou 5) e por 10 (termina em 0).", dica:"Olhe apenas o último algarismo." },
    { id:"T2Q02", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade por 3", display:"O número 126 é divisível por 3?", botoes:["Sim","Não","Só por 9","Depende"], res:"Sim", passo:"1+2+6=9. Como 9 é divisível por 3, o número também é.", dica:"Some os algarismos. Se o resultado for múltiplo de 3, o número também é." },
    { id:"T2Q03", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade por 9", display:"O número 315 é divisível por 9?", botoes:["Sim","Não","Só por 3","Depende"], res:"Sim", passo:"3+1+5=9. Divisível por 9.", dica:"Some os algarismos. Se o resultado for múltiplo de 9, o número também é." },
    { id:"T2Q04", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade por 2", display:"O número 847 é divisível por 2?", botoes:["Não","Sim","Só pela metade","Depende"], res:"Não", passo:"847 termina em 7, que é ímpar. Divisível por 2 só se terminar em 0, 2, 4, 6 ou 8.", dica:"Divisível por 2: último algarismo deve ser par." },
    { id:"T2Q05", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade por 4", display:"O número 1.324 é divisível por 4?", botoes:["Sim","Não","Só por 2","Impossível saber"], res:"Sim", passo:"Critério do 4: dois últimos dígitos (24). 24÷4=6. Exato: sim.", dica:"Para o 4, verifique os dois últimos algarismos." },
    { id:"T2Q06", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Números Primos", display:"Qual destes números é PRIMO?", botoes:["13","15","21","27"], res:"13", passo:"13 só é divisível por 1 e 13. 15=3×5, 21=3×7, 27=3³.", dica:"Primo: exatamente 2 divisores (1 e ele mesmo)." },
    { id:"T2Q07", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisores", display:"Quantos divisores tem o número 18?", botoes:["6","4","8","3"], res:"6", passo:"Divisores de 18: 1, 2, 3, 6, 9, 18. São 6.", dica:"Liste todos os números que dividem 18 sem resto." },
    { id:"T2Q08", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisores", display:"Qual destes números NÃO é divisor de 24?", botoes:["7","6","8","12"], res:"7", passo:"24÷7 não é inteiro. Divisores de 24: 1,2,3,4,6,8,12,24.", dica:"Divisor de 24: divide sem resto." },
    { id:"T2Q09", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Fatoração", display:"Qual é a decomposição em fatores primos de 60?", botoes:["2²×3×5","2×3×5","2³×5","2×30"], res:"2²×3×5", passo:"60÷2=30. 30÷2=15. 15÷3=5. 5 é primo. Logo: 2²×3×5.", dica:"Divida sempre pelo menor primo possível." },
    { id:"T2Q10", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade", display:"O número 720 é divisível por 2, 3 e 5 ao mesmo tempo?", botoes:["Sim, pelos três","Só por 2 e 3","Só por 2 e 5","Não"], res:"Sim, pelos três", passo:"720: termina em 0 (div. por 2 e 5); 7+2+0=9 (div. por 3). Sim aos três.", dica:"Aplique cada critério separadamente." },

    // MDC
    { id:"T2Q11", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"Qual é o MDC de 12 e 18?", botoes:["6","3","9","36"], res:"6", passo:"Divisores de 12: 1,2,3,4,6,12. Divisores de 18: 1,2,3,6,9,18. Maior comum: 6.", dica:"MDC: maior número que divide os dois ao mesmo tempo." },
    { id:"T2Q12", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"Qual é o MDC de 24 e 36?", botoes:["12","6","18","4"], res:"12", passo:"24=2³×3. 36=2²×3². MDC=2²×3=12.", dica:"Na fatoração, pegue os fatores comuns com o menor expoente." },
    { id:"T2Q13", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"Qual é o MDC de 15 e 25?", botoes:["5","3","15","75"], res:"5", passo:"15=3×5. 25=5². Fator comum: 5.", dica:"15 e 25 têm o 5 em comum." },
    { id:"T2Q14", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC — Problema", display:"Ana tem 24 balas e 36 figurinhas. Quer distribuir em grupos iguais sem sobrar. Maior número de grupos?", botoes:["12","6","8","4"], res:"12", passo:"MDC(24,36)=12. Pode fazer 12 grupos com 2 balas e 3 figurinhas cada.", dica:"Distribuição igual sem sobra: MDC." },
    { id:"T2Q15", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"O MDC de dois números primos diferentes é sempre:", botoes:["1","2","O menor","O produto"], res:"1", passo:"Primos diferentes só têm 1 como divisor comum.", dica:"Números primos só são divisíveis por 1 e por eles mesmos." },
    { id:"T2Q16", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"Qual é o MDC de 48 e 64?", botoes:["16","8","4","32"], res:"16", passo:"48=2⁴×3. 64=2⁶. MDC=2⁴=16.", dica:"Pegue o fator 2 com o menor expoente entre os dois." },
    { id:"T2Q17", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC — Problema", display:"Um professor quer dividir 48 lápis e 60 folhas em kits iguais. Maior número de kits?", botoes:["12","6","4","24"], res:"12", passo:"MDC(48,60)=12. Pode fazer 12 kits.", dica:"Kits iguais sem sobra: MDC." },
    { id:"T2Q18", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"Qual é o MDC de 100 e 75?", botoes:["25","5","50","15"], res:"25", passo:"100=2²×5². 75=3×5². MDC=5²=25.", dica:"Fator comum com menor expoente." },

    // MMC
    { id:"T2Q19", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"Qual é o MMC de 4 e 6?", botoes:["12","24","8","2"], res:"12", passo:"Múltiplos de 4: 4,8,12... Múltiplos de 6: 6,12... Menor comum: 12.", dica:"MMC: menor número que é múltiplo dos dois." },
    { id:"T2Q20", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"Qual é o MMC de 3 e 5?", botoes:["15","8","30","2"], res:"15", passo:"3 e 5 são primos entre si. MMC=3×5=15.", dica:"Primos entre si: MMC é o produto." },
    { id:"T2Q21", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"Qual é o MMC de 6 e 9?", botoes:["18","54","3","27"], res:"18", passo:"6=2×3. 9=3². MMC=2×3²=18.", dica:"Pegue todos os fatores com o maior expoente." },
    { id:"T2Q22", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC — Problema", display:"Dois ônibus partem juntos. Um passa a cada 20 min, outro a cada 30 min. Em quantos min passarão juntos de novo?", botoes:["60 min","50 min","10 min","600 min"], res:"60 min", passo:"MMC(20,30)=60 minutos.", dica:"Encontro periódico: use o MMC." },
    { id:"T2Q23", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC — Problema", display:"Uma sirene apita a cada 4 min e outra a cada 6 min. Apitaram juntas agora. Em quantos min apitarão juntas de novo?", botoes:["12 min","24 min","2 min","10 min"], res:"12 min", passo:"MMC(4,6)=12 minutos.", dica:"Eventos periódicos simultâneos: MMC." },
    { id:"T2Q24", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"Qual o menor número divisível por 2, 3 e 4 ao mesmo tempo?", botoes:["12","24","6","9"], res:"12", passo:"MMC(2,3,4)=12. 12÷2=6, 12÷3=4, 12÷4=3.", dica:"Calcule o MMC dos três números." },
    { id:"T2Q25", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"Para calcular MMC(8,12): 8=2³ e 12=2²×3. Qual é o MMC?", botoes:["24","48","4","96"], res:"24", passo:"MMC: maior expoente de cada fator. 2³×3=24.", dica:"No MMC, cada fator vai com o maior expoente." },
    { id:"T2Q26", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC — Problema", display:"Três luzes piscam a cada 3, 4 e 6 segundos. Piscaram juntas agora. Em quantos seg voltarão a piscar juntas?", botoes:["12 s","24 s","6 s","72 s"], res:"12 s", passo:"MMC(3,4,6)=12 segundos.", dica:"MMC dos três períodos." },

    // MÚLTIPLOS
    { id:"T2Q27", tipo:"aritmetica", bncc:"EF07MA01", bncc_desc:"Múltiplos", display:"Quais são os múltiplos de 7 entre 1 e 50?", botoes:["7,14,21,28,35,42,49","7,14,21,28,35,42","7,14,28,35,49","14,21,28,42,49"], res:"7,14,21,28,35,42,49", passo:"7×1=7, 7×2=14, ..., 7×7=49.", dica:"Múltiplos de 7: 7×1, 7×2, 7×3..." },
    { id:"T2Q28", tipo:"aritmetica", bncc:"EF07MA01", bncc_desc:"Múltiplos", display:"O número 1 é divisor de:", botoes:["Todos os inteiros","Só pares","Só primos","Nenhum"], res:"Todos os inteiros", passo:"Qualquer número dividido por 1 é o próprio número.", dica:"1 divide tudo." },
    { id:"T2Q29", tipo:"aritmetica", bncc:"EF07MA01", bncc_desc:"Múltiplos", display:"Quantos múltiplos de 5 existem entre 1 e 50?", botoes:["10","9","11","5"], res:"10", passo:"5,10,15,20,25,30,35,40,45,50. São 10 múltiplos.", dica:"Conte: 5×1 até 5×10." },
    { id:"T2Q30", tipo:"aritmetica", bncc:"EF07MA01", bncc_desc:"Divisores", display:"Quantos divisores tem o número 36?", botoes:["9","6","8","12"], res:"9", passo:"Divisores de 36: 1,2,3,4,6,9,12,18,36. São 9.", dica:"36=2²×3². Pelo critério: (2+1)×(2+1)=9." },

    // CONTEXTUALIZADOS
    { id:"T2Q31", tipo:"aritmetica", bncc:"EF07MA01", bncc_desc:"MMC — Problema", display:"Dois alunos treinam atletismo. Um descansa a cada 4 dias, o outro a cada 6 dias. Descansaram juntos hoje. Em quantos dias de novo?", botoes:["12 dias","24 dias","2 dias","10 dias"], res:"12 dias", passo:"MMC(4,6)=12.", dica:"Encontro periódico: MMC." },
    { id:"T2Q32", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC — Problema", display:"João tem 48 lápis de cor e 64 canetas. Quer distribuir em grupos iguais sem sobrar. Maior número de grupos?", botoes:["16","8","4","32"], res:"16", passo:"MDC(48,64)=16.", dica:"Distribuição igual: MDC." },
    { id:"T2Q33", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"Relação MMC e MDC", display:"O MMC de dois números é 36 e o MDC é 6. Um deles é 12. Qual é o outro?", botoes:["18","24","6","36"], res:"18", passo:"MMC×MDC=produto dos números. 36×6=216. 216÷12=18.", dica:"Use: MMC × MDC = a × b." },
    { id:"T2Q34", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Divisibilidade", display:"O número 1.332 é divisível por 9?", botoes:["Sim","Não","Só por 3","Depende"], res:"Sim", passo:"1+3+3+2=9. Divisível por 9.", dica:"Some os algarismos: se o resultado for múltiplo de 9, o número também é." },
    { id:"T2Q35", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Fatoração", display:"Qual é a decomposição em fatores primos de 12?", botoes:["2²×3","2×6","3×4","2×3×3"], res:"2²×3", passo:"12÷2=6. 6÷2=3. 3 é primo. Logo: 2²×3.", dica:"Divida pelo menor primo até não poder mais." },
    { id:"T2Q36", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC — Problema", display:"Três semáforos abrem juntos. O primeiro abre a cada 30s, o segundo a cada 45s, o terceiro a cada 60s. Em quantos segundos abrirão juntos de novo?", botoes:["180 s","90 s","135 s","60 s"], res:"180 s", passo:"MMC(30,45,60)=180 segundos.", dica:"MMC dos três períodos." },
    { id:"T2Q37", tipo:"aritmetica", bncc:"EF06MA06", bncc_desc:"Números Primos", display:"Qual é a quantidade de números primos entre 1 e 20?", botoes:["8","6","9","7"], res:"8", passo:"Primos até 20: 2,3,5,7,11,13,17,19. São 8.", dica:"Lembre-se: 1 não é primo." },
    { id:"T2Q38", tipo:"aritmetica", bncc:"EF07MA01", bncc_desc:"Múltiplos", display:"50 é múltiplo de 4?", botoes:["Não","Sim","Só se dividido por 2","Depende"], res:"Não", passo:"50÷4=12,5. Não é inteiro, portanto 50 não é múltiplo de 4.", dica:"Múltiplo: a divisão deve ser exata." },
    { id:"T2Q39", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MDC", display:"Qual é o MDC de 100 e 250?", botoes:["50","25","10","100"], res:"50", passo:"100=2²×5². 250=2×5³. MDC=2×5²=50.", dica:"Fatores comuns com menor expoente." },
    { id:"T2Q40", tipo:"aritmetica", bncc:"EF06MA05", bncc_desc:"MMC", display:"Qual é o MMC de 8 e 12?", botoes:["24","48","16","4"], res:"24", passo:"8=2³. 12=2²×3. MMC=2³×3=24.", dica:"Cada fator com o maior expoente." },
];

function mmc(a, b) {
    let maior = Math.max(a, b);
    for (let i = maior; i <= a * b; i += maior) if (i % Math.min(a, b) === 0) return i;
    return a * b;
}

function gerarQuestoes(qtd = 20) {
    const pares = [[2,3],[3,4],[4,6],[5,10],[6,8],[2,5],[3,9],[4,10],[6,9],[8,12],[2,4],[3,6],[5,15],[4,8],[6,12],[2,7],[3,5],[4,9],[6,10],[8,16]];
    return pares.slice(0, qtd).map(([a, b], i) => {
        const res = mmc(a, b);
        const ops = [...new Set([String(res), String(res * 2), String(a * b), String(Math.min(a,b))])].slice(0, 4);
        return {
            id: `B2G${String(i+1).padStart(3,'0')}`,
            tipo: 'aritmetica', bncc: 'EF06MA05', bncc_desc: 'MMC',
            display: `Qual é o MMC de ${a} e ${b}?`,
            botoes: ops, res: String(res),
            passo: `O menor múltiplo comum de ${a} e ${b} é ${res}.`,
            dica: 'Liste os múltiplos de cada número e encontre o menor comum.'
        };
    });
}

export const bloco2 = [...questoesFixas, ...gerarQuestoes(20)];
