import { Category } from "./Category";

export class Item {
    public constructor(public id?: number, public name?: string, public brand?: string, public category?: Category, public quantity?: number, public unit?: string, public price?: number, public cost?: number, public date?: Date) { }
}