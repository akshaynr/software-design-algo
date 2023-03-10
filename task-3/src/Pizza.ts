import { Consumable } from './Consumable';

export class Pizza extends Consumable {
    readonly numberOfSlices: number;
    private numberOfEatenSlices: number = 0;

    constructor(value: number, weight: number, numberOfSlices: number){
        super("pizza", value, weight);
        this.numberOfSlices = numberOfSlices;

        if (this.numberOfSlices === 0) {
            this.isConsumed = true;
        }
    }

    getNumberOfEatenSlices(): number {
        if (this.isConsumed && this.numberOfSlices !== 0) {
          this.numberOfEatenSlices += 1;
        }
        return this.numberOfEatenSlices;
    }
}