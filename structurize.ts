import { OrderProcessor } from "./services/OrderProcessor";
import { LLMService } from "./services/LLMService";
import { OrderValidator } from "./services/OrderValidator";
import { OrderFormatter } from "./services/OrderFormatter";
import { PriceCalculator } from "./services/PriceCalculator";

// Inicializa os serviços
const llmService = new LLMService();
const validator = new OrderValidator();
const formatter = new OrderFormatter();
const priceCalculator = new PriceCalculator();

// Cria o processador de pedidos
const orderProcessor = new OrderProcessor(
    llmService,
    validator,
    formatter,
    priceCalculator
);

export async function structurize(userMessage: string) {
    try {
        const result = await orderProcessor.processOrder(userMessage);
        if (!result) {
            return null;
        }
        return result;
    } catch (error) {
        console.error("[structurize] Erro ao processar pedido:", error);
        return null;
    }
}