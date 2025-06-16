import { IOrder } from "./Order";

export interface IOrderFormatter {
    formatOrder(order: IOrder): string;
} 