import { GroceryListStatus } from "./GroceryListStatus";
import { Item } from "./Item";

export class GroceryList {
    public constructor(public id?: number, 
        public date?: Date, 
        public status?: GroceryListStatus, 
        public consumerName?: string, 
        public totalCost?: number, 
        public shopName?: string, 
        public items?: Item[]) { }
}