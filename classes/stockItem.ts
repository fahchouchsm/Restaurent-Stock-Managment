export default class StockItem {
    constructor(
        public id: string,
        public name: string,
        public quantity: number,
        public unit: string,
        public threshold: number
    ) { }

    addStock(amount: number): void {
        if (amount < 0) throw new Error("Cannot add negative stock");
        this.quantity += amount;
    }

    removeStock(amount: number): void {
        if (amount < 0) throw new Error("Cannot remove negative stock");
        if (this.quantity < amount) throw new Error("Insufficient stock");
        this.quantity -= amount;
    }

    isBelowThreshold(): boolean {
        return this.quantity < this.threshold;
    }
}
