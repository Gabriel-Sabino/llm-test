import { IOrder } from "./Order";

export interface IPriceCalculator {
    calculateTotalPrice(order: IOrder): number;
} 