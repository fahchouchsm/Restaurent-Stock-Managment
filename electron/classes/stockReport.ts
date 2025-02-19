import stockItem from "./stockItem.js";
import { StockTransaction } from "./stockTransaction.js";

export interface StockReport {
    stockItems: Map<string, stockItem>;
    transactions: StockTransaction[];
}