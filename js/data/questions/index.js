// js/data/questions/index.js

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
