export class Meal {
    constructor(
        public id: string,
        public name: string,
        public ingredients: Map<string, number>
    ) {
        ingredients.forEach((quantity, ingredientId) => {
            if (quantity <= 0) {
                throw new Error(`Invalid quantity for ingredient ${ingredientId}`);
            }
        });
    }
}