import StockItem from "./stockItem.js";

export default class ItemCollection {
    public name: string;
    public description: string;
    private items: StockItem[];

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.items = [];
    }

    addItem(stockItem: StockItem): void {
        const existingItem = this.items.find(item => item.id === stockItem.id);
        if (existingItem) {
            existingItem.addStock(stockItem.quantity);
        } else {
            this.items.push(new StockItem(
                stockItem.id, stockItem.name, stockItem.quantity, stockItem.unit, stockItem.threshold
            ));
        }
    }

    removeItem(id: string): void {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        } else {
            throw new Error("Item not found");
        }
    }

    getItem(id: string): StockItem | undefined {
        return this.items.find(item => item.id === id);
    }

    listItems(): StockItem[] {
        return [...this.items]; // Return a copy to prevent direct modification
    }

    getLowStockItems(): StockItem[] {
        return this.items.filter(item => item.isBelowThreshold());
    }

    containsItem(id: string): boolean {
        return this.items.some(item => item.id === id);
    }

    clear(): void {
        this.items = [];
    }
}
