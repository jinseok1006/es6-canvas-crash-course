export default class Head4 {
    constructor(canvas) {
        this.canvas = canvas;
        this.car = new Car(100, 100, 50, 100);

        this.animate(this.canvas.ctx);
    }

    animate() {
        this.car.update();
        this.canvas.clear();
        this.car.draw(this.canvas.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}

class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0;

        this.controls = new Controls();
    }

    // 내가 만든 좌표축은
    // 왼
    // 오른쪽이 각이 감소하는 방향

    update() {
        if (this.controls.right) {
            this.angle += 0.03;
        }
        if (this.controls.left) {
            this.angle -= 0.03;
        }
    }

    draw(ctx) {
        // console.log(ctx);
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);
        ctx.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

class Controls {
    constructor() {
        this.left = false;
        this.right = false;

        this.#addKeyboardListener();
    }

    #addKeyboardListener() {
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
            }
            console.table(this);
        });
        window.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
            }
            console.table(this);
        });
    }
}
