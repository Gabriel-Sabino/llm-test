import { storeProducts } from "./store";
import { PAYMENT_MAP, addressMap, productEmojis } from "./constants";

// Função para remover acentos
export function removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Função para simplificar texto (remover acentos, minúsculas, remover palavras comuns)
export function simplifyText(str: string): string {
    return removeAccents(str)
        .toLowerCase()
        .replace(/\b(para|por|a|o|as|os)\b/g, '')
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

// Gera instruções de normalização de pagamento
export function generatePaymentInstructions(): string {
    return Object.entries(PAYMENT_MAP)
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

export function getProductEmoji(productName: string): string {
    for (const [key, emoji] of Object.entries(productEmojis)) {
        if (productName.includes(key)) return emoji;
    }
    return '🍽️'; // Emoji padrão para produtos não mapeados
} 