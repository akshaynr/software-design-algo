export class Point {
    public x: number;
    public y: number;

    constructor();
    constructor(x: number, y: number);
    constructor(...args: number[]){
        if(args.length == 0){
            this.x = 0;
            this.y = 0;
        } else if(args.length == 2){ 
            this.x = args[0];
            this.y = args[1];
        } else{

            this.x = 0;
            this.y = 0;
        }
    }

    toString(){
        return `(${this.x}, ${this.y})`;
    }

    distance():number;
    distance(other: Point): number;
    distance(x: number, y: number): number;

    distance(xValue ?: any, yValue ?: any) : number{

        if(xValue == undefined){
            return Math.sqrt(this.x ** 2 +  this.y ** 2);
        } else if(yValue == undefined){
            return Math.sqrt((this.x -  xValue.x) ** 2 +  (this.y - xValue.y) ** 2);
        } else{
            return Math.sqrt((this.x -  xValue) ** 2 +  (this.y - yValue) ** 2);
        }
    }
}