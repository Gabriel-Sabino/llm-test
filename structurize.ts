import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { storeProducts } from "./store";
import {
    generateProductNormalizationExamples,
    generatePaymentInstructions,
    generateAddressInstructions,
    generateMenuList,
    numberExamples
} from "./normalizationUtils";

type Product = {
    name: string;
    quantity: number;
};

type Address = {
    street: string;
    number: number;
    neighboorhood: string;
};

type PaymentMethod = 'pix' | 'money' | 'credit' | 'debit' | 'VR' | 'VA';

type OrderResult = {
    products: Product[];
    address: Address;
    payment: PaymentMethod;
    totalPrice: number;
};

// Mapeamento de emojis para produtos
const productEmojis: { [key: string]: string } = {
    'Temaki': '🍣',
    'Sashimi': '🐟',
    'Uramakis': '🍣',
    'Hot Roll': '🍣',
    'Hot Fry': '🔥',
    'Rolinho': '🍫',
    'Refrigerante': '🥤',
    'H2oh': '💧',
    'Suco': '🥤',
    'Água': '💧',
    'Mini Sushi': '🍣',
    'Niguiri': '🍣',
    'Combo': '🍱'
};

function getProductEmoji(productName: string): string {
    for (const [key, emoji] of Object.entries(productEmojis)) {
        if (productName.includes(key)) return emoji;
    }
    return '🍽️'; // Emoji padrão para produtos não mapeados
}

function formatOrderLog(products: Product[]): string {
    if (products.length === 0) return '';

    // Agrupa produtos por tipo
    const groupedProducts = products.reduce((acc, product) => {
        const emoji = getProductEmoji(product.name);
        if (!acc[emoji]) acc[emoji] = [];
        acc[emoji].push(product);
        return acc;
    }, {} as { [key: string]: Product[] });

    // Formata a mensagem
    const productDescriptions = Object.entries(groupedProducts).map(([emoji, prods]) => {
        const descriptions = prods.map(p => {
            if (p.quantity === 1) return p.name.toLowerCase();
            return `${p.quantity} ${p.name.toLowerCase()}`;
        });
        return `${descriptions.join(', ')} ${emoji.repeat(prods.length)}`;
    });

    const formattedProducts = productDescriptions.join(' ');
    
    // Escolhe uma mensagem aleatória para o início
    const messages = [
        'Seu pedido foi anotado e será entregue em breve:',
        'Será entregue em breve:',
        'Pedido confirmado:',
        'Seu pedido:'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    return `${randomMessage} ${formattedProducts}`;
}

function calculateTotalPrice(products: Product[]): number {
    return products.reduce((total, product) => {
        const storeProduct = storeProducts.find(p => p.name === product.name);
        if (!storeProduct) throw new Error(`Produto não encontrado: ${product.name}`);
        return total + (product.quantity * storeProduct.price);
    }, 0);
}

export async function structurize(userMessage: string): Promise<OrderResult | null> {
    try {
        // Gera o prompt dinamicamente
        const prompt = `Você é um assistente especializado em extrair e normalizar informações de pedidos de delivery.
            
            Sua tarefa é extrair e normalizar as informações do pedido, garantindo que:
            1. Os nomes dos produtos sejam EXATAMENTE iguais aos do cardápio (incluindo espaços, acentos e parênteses)
            2. Os números por extenso sejam convertidos para números
            3. Os endereços sejam normalizados
            4. As formas de pagamento sejam normalizadas
            
            CARDÁPIO (use EXATAMENTE estes nomes, sem alterações):
            ${generateMenuList()}

            REGRAS DE NORMALIZAÇÃO:
            1. Produtos:
               - Use EXATAMENTE os nomes do cardápio, sem alterações
               - Exemplos de normalização:
            ${generateProductNormalizationExamples(storeProducts.map(p => p.name))}
               - IMPORTANTE: Não adicione, remova ou altere palavras dos nomes dos produtos
               - IMPORTANTE: Não use abreviações ou traduções

            2. Endereços:
            ${generateAddressInstructions()}
               - Converter números por extenso para números:
            ${numberExamples}

            3. Pagamento:
            ${generatePaymentInstructions()}

            IMPORTANTE:
            1. Use EXATAMENTE os nomes dos produtos do cardápio, sem alterações
            2. Mantenha os espaços, acentos e parênteses exatamente como mostrados
            3. Não adicione ou remova palavras dos nomes dos produtos
            4. Não altere a ordem das palavras nos nomes dos produtos
            5. Não use abreviações nos nomes dos produtos
            6. Não normalize ou altere os nomes dos produtos de forma diferente dos exemplos
            7. Use EXATAMENTE os nomes normalizados dos endereços, sem alterações

            Retorne APENAS um objeto JSON com as informações normalizadas, sem nenhum texto adicional.
            Exemplo de retorno:
            {
                "products": [{"name": "Temaki de Salmão", "quantity": 2}],
                "address": {"street": "Avenida das Flores", "number": 123, "neighboorhood": "Centro"},
                "payment": "credit"
            }`;

        const { text: structuredData } = await generateText({
            model: openai("gpt-4.1-mini"),
            system: prompt,
            prompt: userMessage
        });

        // Parse the LLM response
        const parsedData = JSON.parse(structuredData);

        // Calculate total price
        const totalPrice = calculateTotalPrice(parsedData.products);

        // Formata e exibe o log do pedido
        const orderLog = formatOrderLog(parsedData.products);
        console.log(orderLog);

        return {
            products: parsedData.products,
            address: parsedData.address,
            payment: parsedData.payment,
            totalPrice
        };
    } catch (error) {
        console.error('Erro ao processar o pedido:', error);
        return null;
    }
}