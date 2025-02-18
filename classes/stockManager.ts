import { Meal } from "./meal.js";
import stockItem from "./stockItem.js";
import { StockReport } from "./stockReport.js";
import { StockTransaction } from "./stockTransaction.js";

export class StockManager {
    private stockItems: Map<string, stockItem> = new Map();
    private meals: Map<string, Meal> = new Map();
    public transactions: StockTransaction[] = [];

    addStock(stockItemId: string, amount: number): void {
        const item = this.stockItems.get(stockItemId);
        if (!item) throw new Error("Stock item not found");

        item.addStock(amount);
        new StockTransaction(
            crypto.randomUUID(),
            'add',
            item.name,
            stockItemId,
            undefined,
            amount
        ).recordTransaction(this);
    }

    consumeStock(mealId: string, servings: number): void {
        const meal = this.meals.get(mealId);
        if (!meal) throw new Error("Meal not found");

        const requiredIngredients = new Map<string, number>();
        meal.ingredients.forEach((quantity, ingredientId) => {
            requiredIngredients.set(ingredientId, quantity * servings);
        });

        // Check stock first
        requiredIngredients.forEach((required, ingredientId) => {
            const stockItem = this.stockItems.get(ingredientId);
            if (!stockItem || stockItem.quantity < required) {
                throw new Error(`Insufficient stock for ${stockItem?.name || ingredientId}`);
            }
        });

        // Deduct stock
        requiredIngredients.forEach((required, ingredientId) => {
            this.stockItems.get(ingredientId)?.removeStock(required);
        });

        new StockTransaction(
            crypto.randomUUID(),
            'consume',
            meal.name,
            undefined,
            requiredIngredients,
            servings
        ).recordTransaction(this);
    }

    recordLoss(stockItemId: string, amount: number): void {
        const item = this.stockItems.get(stockItemId);
        if (!item) throw new Error("Stock item not found");

        item.removeStock(amount);
        new StockTransaction(
            crypto.randomUUID(),
            'loss',
            item.name,
            stockItemId,
            undefined,
            amount
        ).recordTransaction(this);
    }

    generateReport(): StockReport {
        return {
            stockItems: new Map(this.stockItems),
            transactions: [...this.transactions]
        };
    }

    // Additional helper methods
    addStockItem(item: stockItem): void {
        this.stockItems.set(item.id, item);
    }

    addMeal(meal: Meal): void {
        this.meals.set(meal.id, meal);
    }
}