import { Point } from "./Point";
import { Shape } from "./Shape";

enum TRIANGLETYPE{
    EQUILATERAL = "equilateral triangle",
    ISOSCELES = "isosceles triangle",
    SCALENE = "scalene triangle"
}


export class Triangle extends Shape {
    vertexA: Point;
    vertexB: Point;
    vertexC: Point;

    constructor(vertexA: Point, vertexB: Point, vertexC: Point);
    constructor(vertexA: Point, vertexB: Point, vertexC: Point, color: string, filled: boolean);

    constructor(vertexA: Point, vertexB: Point, vertexC: Point, color ?: string, filled ?: boolean){
        if(color){
            filled = typeof filled == "boolean" ? filled : true;
            super([vertexA, vertexB, vertexC], color, filled);
        } else{
            super([vertexA, vertexB, vertexC]);
        }
        this.vertexA = vertexA;
        this.vertexB = vertexB;
        this.vertexC = vertexC;
        
    };


    toString(){
        return `Triangle[v1=(${this.vertexA.x}, ${this.vertexA.y}),v2=(${this.vertexB.x}, ${this.vertexB.y}),v3=(${this.vertexC.x}, ${this.vertexC.y})]`;
    }
    
    getType(){
        const sideA = this.vertexA.distance(this.vertexB).toFixed(2);
        const sideB = this.vertexA.distance(this.vertexC).toFixed(2);
        const sideC = this.vertexB.distance(this.vertexC).toFixed(2);


        if(sideA == sideB && sideB == sideC){
            return TRIANGLETYPE.EQUILATERAL;
        } else if(sideA == sideB || sideB == sideC || sideA == sideC){
            return TRIANGLETYPE.ISOSCELES;
        } else{
            return TRIANGLETYPE.SCALENE;
        }
    }
}