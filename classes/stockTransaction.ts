import { StockManager } from "./stockManager.js";



export class StockTransaction {
    public timestamp: Date = new Date();

    constructor(
        public id: string,
        public type: 'add' | 'consume' | 'loss',
        public name: string,
        public stockItemId?: string,
        public ingredients?: Map<string, number>,
        public quantity?: number
    ) { }

    getRequiredStock(): Map<string, number> {
        return this.ingredients || new Map();
    }

    recordTransaction(manager: StockManager): void {
        manager.transactions.push(this);
    }
}