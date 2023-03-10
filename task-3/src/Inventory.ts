import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
  private items: Item[] = [];

  constructor() {}

  sort(comparator?: ItemComparator): Item[]{
    if(comparator == undefined){
        return this.items.sort((a, b) => a.value - b.value);
    } else{
        return this.items.sort((a, b) => comparator.compare(a, b));
    }
  }

  addItem(item: Item): void{
    this.items.push(item);
  }

  toString(): string{
    return this.items.map((ele) => ele.toString()).join(", ");
  }
}