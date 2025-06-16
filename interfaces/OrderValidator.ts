import { IOrder } from "./Order";

export interface IOrderValidator {
    validateOrder(order: IOrder): boolean;
} 