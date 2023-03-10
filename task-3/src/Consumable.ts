import { Item } from './Item';

export abstract class Consumable extends Item {
    isConsumed: boolean;
    private isSpoiled: boolean;

    constructor(name: string, value: number, weight: number, isSpoiled : boolean = false){
        super(name, value, weight);
        this.isSpoiled = isSpoiled;
        this.isConsumed = false;
    }

    use(): string {
        if(this.isConsumed){
            return `There's nothing left of the ${this.name} to consume.`;
        } else{
            let result = `You consumed the ${this.name}.`;

            if(this.isSpoiled){
                result += `\nYou feel sick.`;
            };

            this.isConsumed = true;
            return result;
        }
    }
}