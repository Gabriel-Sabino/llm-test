import { IOrder, IOrderProcessor, IOrderValidator, IOrderFormatter, IPriceCalculator, ILLMService } from "../interfaces/index";
import { Logger } from "./Logger";
import { storeProducts } from "../store";

export class OrderProcessor implements IOrderProcessor {
    constructor(
        private readonly llmService: ILLMService,
        private readonly validator: IOrderValidator,
        private readonly formatter: IOrderFormatter,
        private readonly priceCalculator: IPriceCalculator
    ) {}

    async processOrder(userMessage: string): Promise<IOrder | null> {
        try {
            // Gera dados estruturados usando LLM
            const orderData = await this.llmService.generateStructuredData(userMessage);
            if (!orderData) return null;

            // Adiciona os preços aos produtos
            const productsWithPrice = orderData.products.map(product => {
                const storeProduct = storeProducts.find(p => p.name === product.name);
                return {
                    ...product,
                    price: storeProduct ? storeProduct.price.toString() : "0"
                };
            });

            const orderWithPrice = {
                ...orderData,
                products: productsWithPrice
            };

            // Valida os dados
            if (!this.validator.validateOrder(orderWithPrice)) {
                return null;
            }

            // Calcula o preço total
            const totalPrice = this.priceCalculator.calculateTotalPrice(orderWithPrice);
            const order: IOrder = {
                ...orderWithPrice,
                totalPrice
            };

            // Formata e loga o pedido
            const formattedOrder = this.formatter.formatOrder(order);
            Logger.logOrder(formattedOrder);

            return order;
        } catch (error) {
            Logger.logError("OrderProcessor", error);
            return null;
        }
    }
} 