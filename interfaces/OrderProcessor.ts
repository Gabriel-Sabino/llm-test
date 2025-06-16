import { IOrder } from "./Order";

export interface IOrderProcessor {
    processOrder(userMessage: string): Promise<IOrder | null>;
} 