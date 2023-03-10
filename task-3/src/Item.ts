import { Comparable } from "./Comparable";

export abstract class Item implements Comparable<Item> {
    static idCounter: number = 0;
    readonly name: string;
    value: number;
    weight: number;
    private readonly id: number;

    constructor(name: string, value: number, weight: number){
        console.log('Id:', Item.idCounter);
        this.name = name;
        this.value = value;
        this.weight = weight;
        this.id = ++Item.idCounter;
    }

    static resetIdCounter(): void {
        Item.idCounter = 0;
    } 

    use(): void {}

    compareTo(other: Item): number {
        if(this.value == other.value){
            const currName = this.name.toLowerCase();
            const otherInstanceName = other.name.toLowerCase();
            if(currName > otherInstanceName) {
                return 1;
            } else if(currName < otherInstanceName){
                return -1;
            }
        } else{
            if(this.value > other.value){
                return 1;
            } else {
                return -1;
            }
        }
        
        return 0;
    }

    toString() : string {
        return `${this.name} - Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`;
    }

    getId(): number {
        return this.id;
    }
}