// Tipos de pagamento
export const PAYMENT_METHODS = {
    PIX: 'pix',
    MONEY: 'money',
    CREDIT: 'credit',
    DEBIT: 'debit',
    VR: 'VR',
    VA: 'VA'
} as const;

export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];

// Mapeamento de pagamento em português para inglês
export const PAYMENT_MAP = {
    'dinheiro': PAYMENT_METHODS.MONEY,
    'dinnheiro': PAYMENT_METHODS.MONEY,
    'debito': PAYMENT_METHODS.DEBIT,
    'débito': PAYMENT_METHODS.DEBIT,
    'crédito': PAYMENT_METHODS.CREDIT,
    'credito': PAYMENT_METHODS.CREDIT,
    'pix': PAYMENT_METHODS.PIX,
    'vr': PAYMENT_METHODS.VR,
    'va': PAYMENT_METHODS.VA
} as const;

// Mensagens de erro
export const ERROR_MESSAGES = {
    PRODUCT_NOT_FOUND: "Produto não encontrado no cardápio",
    QUANTITY_INVALID: "Quantidade deve ser maior que zero",
    STREET_REQUIRED: "Rua é obrigatória",
    NEIGHBORHOOD_REQUIRED: "Bairro é obrigatório",
    PRODUCTS_REQUIRED: "Pelo menos um produto é obrigatório",
    INVALID_NUMBER: "Número inválido",
    ORDER_PROCESSING_ERROR: "Desculpe, ocorreu um erro ao processar seu pedido. Por favor, tente novamente.",
    ORDER_NOT_UNDERSTOOD: "Desculpe, não consegui entender seu pedido. Por favor, tente novamente."
} as const;

// Funções utilitárias
export const formatPrice = (priceInCents: number): string => {
    return `R$ ${(priceInCents/100).toFixed(2)}`;
};

export const parsePrice = (price: string): number => {
    // Se já for número em string, apenas converte
    const num = Number(price);
    if (!isNaN(num)) return num;
    // Se vier no formato R$ 21,00
    const match = price.match(/(\d+)[,.]?(\d{0,2})/);
    if (match) {
        const reais = parseInt(match[1], 10);
        const centavos = match[2] ? parseInt(match[2].padEnd(2, '0'), 10) : 0;
        return reais * 100 + centavos;
    }
    return 0;
};

// Mapeamento de regras de normalização de endereços
export const addressMap = {
    'Av.': 'Avenida',
    'Av': 'Avenida',
    'R.': 'Rua',
    'R': 'Rua',
    'bairro': '',
    'número': '',
    'num': '',
    'n.': ''
};

// Exemplos de números por extenso
export const numberExamples = [
    '* "dez" -> 10',
    '* "cinquenta e cinco" -> 55',
    '* "cento e vinte" -> 120',
    '* "quinhentos" -> 500',
    '* "setenta e sete" -> 77',
    '* "doze" -> 12',
    '* "novecentos e noventa e nove" -> 999'
].join('\n');

// Mapeamento de emojis para produtos
export const productEmojis: { [key: string]: string } = {
    // Sushi e derivados
    'Temaki': '🍣',
    'Sashimi': '🐟',
    'Uramakis': '🍣',
    'Hot Roll': '🍣',
    'Hot Fry': '🔥',
    'Mini Sushi': '🍣',
    'Niguiri': '🍣',
    'Combo': '🍱',
    
    // Sobremesas
    'Rolinho': '🍫',
    
    // Bebidas
    'Refrigerante': '🥤',
    'H2oh': '💧',
    'Suco': '🥤',
    'Água': '💧'
}; 