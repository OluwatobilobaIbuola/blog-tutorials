interface Shape {
  area(): number;
  perimeter(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

function calculateArea(shape: Shape): number {
  return shape.area();
}

const circle = new Circle(10);
console.log("area", calculateArea(circle));
