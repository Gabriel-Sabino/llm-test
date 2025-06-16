import { IAddress } from "./Address";
import { PaymentMethod } from "../constants";

export interface ILLMServiceResponse {
    products: {
        name: string;
        quantity: number;
    }[];
    address: IAddress;
    payment: PaymentMethod;
}

export interface ILLMService {
    generateStructuredData(userMessage: string): Promise<ILLMServiceResponse>;
} 