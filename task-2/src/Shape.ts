import { Point } from "./Point";

enum COLOR {
  GREEN = "green"
}

export abstract class Shape {
  abstract getType(): string;

  protected color: string;
  protected filled: boolean;
  points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color ?: string, filled ?: boolean){
    if(points.length < 3){
      throw new Error('Shape should have atleast 3 points');
    }

    this.points = points;
    this.color = color ? color : COLOR.GREEN
    this.filled = typeof filled == "boolean" ? filled : true;
  }

  toString(): string{
    let text = `A Shape with color of ${this.color} and ${this.filled ? '' : 'not '}filled. Points: `
    this.points.forEach((point: Point, index: number) => {
      text += `(${point.x}, ${point.y})`;

      if(index < this.points.length - 1){
        text += ', ';
      } else{
        text += '.';
      }
    });

    return text;
  }

  getPerimeter():number {
    let perimeter = this.points[0].distance(this.points[this.points.length-1]);

    this.points.forEach((point: Point, index: number) => {
      if(index + 1 < this.points.length){
        perimeter += point.distance(this.points[index + 1]);
      }
    })

    return perimeter;
  }
}
