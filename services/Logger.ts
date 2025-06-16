export class Logger {
    static logOrder(formattedOrder: string): void {
        console.log(formattedOrder);
    }

    static logError(context: string, error: any): void {
        console.error(`[${context}] Erro:`, error);
    }
} 