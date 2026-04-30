// js/data/questions/index.js
// Mapa de blocos para o evento 06/05/2026 - Dia da Matemática
// Bloco 1: Inteiros - Soma e Subtração (EF07MA03)
// Bloco 2: Múltiplos e Divisores (EF07MA01)
// Bloco 3: Inteiros - Multiplicação e Divisão (EF07MA04)
// Bloco 4: Frações (EF06MA07, EF06MA08, EF06MA09)
// Bloco 5: MMC e MDC (EF06MA05, EF06MA06)

import { bloco1 } from './bloco1.js';
import { bloco2 } from './bloco2.js';
import { bloco3 } from './bloco3.js';
import { bloco4 } from './bloco4.js';
import { bloco5 } from './bloco5.js';

function marcarBloco(questoes, bloco) {
    return questoes.map((q) => ({ ...q, bloco }));
}

export const pool = [
    ...marcarBloco(bloco1, 1),
    ...marcarBloco(bloco2, 2),
    ...marcarBloco(bloco3, 3),
    ...marcarBloco(bloco4, 4),
    ...marcarBloco(bloco5, 5)
];
