export default class Head4 {
    constructor(canvas) {
        this.canvas = canvas;
        this.car = new Car(10, 10, 50, 100);

        this.animate();
    }

    animate() {
        this.canvas.resize();
        this.car.draw(this.canvas.ctx);
    }

    draw(ctx) {
        const angle = 0;
    }
}

class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {}

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
