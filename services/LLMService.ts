import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { ILLMService, ILLMServiceResponse } from "../interfaces/LLMService";
import {
    generateProductNormalizationExamples,
    generatePaymentInstructions,
    generateAddressInstructions,
    generateMenuList
} from "../normalizationUtils";
import { storeProducts } from "../store";
import { numberExamples } from "../constants";

export class LLMService implements ILLMService {
    async generateStructuredData(userMessage: string): Promise<ILLMServiceResponse> {
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
                "products": [
                    {
                        "name": "Temaki de Salmão",
                        "quantity": 2
                    }
                ],
                "address": {
                    "street": "Avenida das Flores",
                    "number": 123,
                    "neighboorhood": "Centro"
                },
                "payment": "credit"
            }`;

        const { text: structuredData } = await generateText({
            model: openai("gpt-4.1-mini"),
            system: prompt,
            prompt: userMessage
        });

        return JSON.parse(structuredData);
    }
} 