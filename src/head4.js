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
        this.velocity = 0;
        this.maxVelocity = 3;

        this.friction = 0.03;

        this.controls = new Controls();
    }

    // 내가 만든 좌표축은
    //

    update() {
        if (this.controls.right) {
            this.angle += 0.03;
        }
        if (this.controls.left) {
            this.angle -= 0.03;
        }
        if (this.controls.forward) {
            this.velocity += 0.1;
        }
        if (this.controls.backward) {
            this.velocity -= 0.1;
        }

        if (this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity;
        } else if (this.velocity < -this.maxVelocity) {
            this.velocity = -this.maxVelocity;
        }

        if (Math.abs(this.velocity) < this.friction) {
            this.velocity = 0;
        }

        if (this.velocity > 0) {
            this.velocity -= this.friction;
        } else if (this.velocity < 0) {
            this.velocity += this.friction;
        }

        this.y -= Math.cos(this.angle) * this.velocity;
        this.x += Math.sin(this.angle) * this.velocity;
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
        this.backward = false;
        this.forward = false;

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
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.backward = true;
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
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.backward = false;
            }
            console.table(this);
        });
    }
}
