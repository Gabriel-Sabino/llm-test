import { storeProducts } from "./store";

// Função para remover acentos
export function removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Função para simplificar texto (remover acentos, minúsculas, remover palavras comuns)
export function simplifyText(str: string): string {
    return removeAccents(str)
        .toLowerCase()
        .replace(/\b(de|do|da|e|com|para|por|a|o|as|os)\b/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Função para gerar exemplos de normalização de produtos
export function generateProductNormalizationExamples(names: string[]): string {
    const examples = names.map(original => {
        const simplified = simplifyText(original).replace(/\s+/g, ' ').trim();
        return `* "${simplified}" -> "${original}"`;
    });
    return examples.join('\n');
}

// Mapeamento de formas de pagamento
export const paymentMap = {
    'dinheiro': 'money',
    'dinnheiro': 'money',
    'debito': 'debit',
    'crédito': 'credit',
    'credito': 'credit',
    'pix': 'pix',
    'vr': 'VR',
    'va': 'VA'
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

// Gera instruções de normalização de pagamento
export function generatePaymentInstructions(): string {
    return Object.entries(paymentMap)
        .map(([k, v]) => `"${k}" -> "${v}"`)
        .join('\n');
}

// Gera instruções de normalização de endereços
export function generateAddressInstructions(): string {
    return Object.entries(addressMap)
        .map(([k, v]) => v ? `* "${k}" -> "${v}"` : `* Remova a palavra "${k}"`)
        .join('\n');
}

// Gera a lista de produtos do cardápio
export function generateMenuList(): string {
    return storeProducts
        .map(p => `- ${p.name}`)
        .join('\n');
} 