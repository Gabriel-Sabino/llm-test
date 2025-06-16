import { PaymentMethod } from "../constants";
import { IAddress } from "./Address";
import { IProduct } from "./Product";

export interface IOrder {
    products: IProduct[];
    address: IAddress;
    payment: PaymentMethod;
    totalPrice?: number;
} 