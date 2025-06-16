import { IOrder, IPriceCalculator } from "../interfaces/index";
import { parsePrice } from "../constants";

export class PriceCalculator implements IPriceCalculator {
    calculateTotalPrice(order: IOrder): number {
        return order.products.reduce((total, product) => {
            const price = parsePrice(product.price);
            return total + (price * product.quantity);
        }, 0);
    }
} 