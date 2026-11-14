/** Prepara um texto de tela para a voz sintética falar bem em português (função pura, testável). */
const UNID = { km: ['quilômetro', 'quilômetros'], cm: ['centímetro', 'centímetros'], mm: ['milímetro', 'milímetros'], m: ['metro', 'metros'], kg: ['quilo', 'quilos'], mL: ['mililitro', 'mililitros'], ml: ['mililitro', 'mililitros'], L: ['litro', 'litros'], h: ['hora', 'horas'], min: ['minuto', 'minutos'] };
const plural = (n, s, p) => (String(n).trim() === '1' ? s : p);

export function paraFala(texto) {
    let t = String(texto == null ? '' : texto);
    // dinheiro: R$ 12 => 12 reais, R$ 12,50 => 12 reais e 50 centavos
    t = t.replace(/R\$\s*(\d+(?:\.\d{3})*)(?:,(\d{1,2}))?/g, (_, r, c) => {
        const reais = r.replace(/\./g, '');
        let s = `${reais} ${plural(reais, 'real', 'reais')}`;
        if (c) { const cent = c.length === 1 ? c + '0' : c; if (Number(cent)) s += ` e ${Number(cent)} ${plural(Number(cent), 'centavo', 'centavos')}`; }
        return s;
    });
    // unidades coladas ao número (inclui m², cm³)
    t = t.replace(/(\d)\s?(km|cm|mm|mL|ml|min|kg|m|L|h)(²|³)?(?![A-Za-zÀ-ÿ])/g, (_, n, u, e) => {
        const [s, p] = UNID[u];
        return `${n} ${plural(n, s, p)}${e === '²' ? ' quadrados' : e === '³' ? ' cúbicos' : ''}`;
    });
    // zero com sinal ("−0") é só zero
    t = t.replace(/(^|[\s(])[−-]0(?![\d,.])/g, '$10');
    t = t
        .replace(/(\d)\s?%/g, '$1 por cento').replace(/%/g, ' por cento')
        .replace(/∛/g, ' raiz cúbica de ').replace(/√/g, ' raiz quadrada de ')
        .replace(/²/g, ' ao quadrado ').replace(/³/g, ' ao cubo ')
        .replace(/\^\s*\(?\s*([−-]?\w+)\s*\)?/g, ' elevado a $1 ')
        .replace(/π/g, ' pi ').replace(/°/g, ' graus ')
        .replace(/≠/g, ' diferente de ').replace(/≤/g, ' menor ou igual a ').replace(/≥/g, ' maior ou igual a ')
        .replace(/×|\*/g, ' vezes ').replace(/÷/g, ' dividido por ')
        .replace(/(\d)\s?\/\s?(\d)/g, '$1 sobre $2')
        .replace(/=/g, ' igual a ').replace(/\+/g, ' mais ')
        .replace(/[−–]/g, ' menos ').replace(/(^|\s)-(?=[\d(])/g, '$1 menos ').replace(/\s-\s/g, ' menos ')
        .replace(/[{}\[\]]/g, ' ')
        .replace(/\s+([.,;:?!])/g, '$1').replace(/\s+/g, ' ').trim();
    return t;
}
