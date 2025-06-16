import { IOrder, IOrderFormatter, IProduct } from "../interfaces/index";
import { getProductEmoji } from "../normalizationUtils";
import { formatPrice } from "../constants";

export class OrderFormatter implements IOrderFormatter {
    formatOrder(order: IOrder): string {
        const products = order.products.map(p => this.formatProduct(p)).join('\n');
        return `🍽️ *PEDIDO CONFIRMADO* 🍽️\n\n${products}\n\n📍 *Endereço de Entrega:*\n${order.address.street}, ${order.address.number}\n${order.address.neighboorhood}\n\n💳 *Forma de Pagamento:* ${order.payment}\n💰 *Total:* ${formatPrice(order.totalPrice || 0)}`;
    }

    private formatProduct(product: IProduct): string {
        const emoji = getProductEmoji(product.name);
        return `${emoji} ${product.name} x${product.quantity}`;
    }
} 