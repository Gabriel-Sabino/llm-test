import { z } from "zod";
import { IOrder, IOrderValidator } from "../interfaces/index";
import { storeProducts } from "../store";
import { PAYMENT_METHODS, ERROR_MESSAGES } from "../constants";

export class OrderValidator implements IOrderValidator {
    private readonly ProductSchema = z.object({
        name: z.string().refine(
            name => storeProducts.some(p => p.name === name),
            { message: ERROR_MESSAGES.PRODUCT_NOT_FOUND }
        ),
        quantity: z.number().positive(ERROR_MESSAGES.QUANTITY_INVALID)
    });

    private readonly AddressSchema = z.object({
        street: z.string().min(1, ERROR_MESSAGES.STREET_REQUIRED),
        number: z.union([
            z.number(),
            z.string().transform((val) => {
                const num = parseInt(val);
                if (isNaN(num)) throw new Error(ERROR_MESSAGES.INVALID_NUMBER);
                return num;
            })
        ]),
        neighboorhood: z.string().min(1, ERROR_MESSAGES.NEIGHBORHOOD_REQUIRED)
    });

    private readonly PaymentMethodSchema = z.enum([
        PAYMENT_METHODS.PIX,
        PAYMENT_METHODS.MONEY,
        PAYMENT_METHODS.CREDIT,
        PAYMENT_METHODS.DEBIT,
        PAYMENT_METHODS.VR,
        PAYMENT_METHODS.VA
    ]);

    private readonly OrderSchema = z.object({
        products: z.array(this.ProductSchema).min(1, ERROR_MESSAGES.PRODUCTS_REQUIRED),
        address: this.AddressSchema,
        payment: this.PaymentMethodSchema,
        totalPrice: z.number().optional()
    });

    validateOrder(order: IOrder): boolean {
        try {
            this.OrderSchema.parse(order);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(`[ValidationError] Erro de validação: ${error.errors.map(e => e.message).join(', ')}`);
            }
            return false;
        }
    }
} 