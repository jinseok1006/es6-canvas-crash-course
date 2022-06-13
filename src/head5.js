import { getIntersection } from "./utils.js";

// getIntersection
export default class Head5 {
    constructor(canvas) {
        this.canvas = canvas;
        this.raf = null;
        this.radius = 50;
        this.angle = 0;
        this.mouse = { x: 0, y: 0 };
        this.A = { x: 0, y: 0 };
        this.B = { x: 0, y: 0 };
        this.C = { x: 100, y: 100 };
        this.D = { x: 200, y: 200 };
        this.I = { x: 0, y: 0 };

        setTimeout(() => {
            this.init();
        }, 100);

        this.animate(this.canvas.ctx);
    }
    init() {
        window.onmousemove = (event) => {
            this.mouse.x = event.x;
            this.mouse.y = event.y - this.canvas.navHeight; // 이건 좀..
        };
        window.onclick = (event) => {
            this.C.x = event.x;
            this.C.y = event.y - this.canvas.navHeight;
        };
        window.oncontextmenu = (event) => {
            event.preventDefault();
            this.D.x = event.x;
            this.D.y = event.y - this.canvas.navHeight;
        };
    }

    animate(ctx) {
        this.canvas.clear();
        this.update();
        this.draw(ctx);

        this.raf = requestAnimationFrame(this.animate.bind(this, ctx));
    }
    update() {
        this.A.x = this.mouse.x + Math.cos(this.angle) * this.radius;
        this.A.y = this.mouse.y + Math.sin(this.angle) * this.radius;
        this.B.x = this.mouse.x - Math.cos(this.angle) * this.radius;
        this.B.y = this.mouse.y - Math.sin(this.angle) * this.radius;

        this.I = getIntersection(this.A, this.B, this.C, this.D);
        this.angle += 0.02;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.A.x, this.A.y);
        ctx.lineTo(this.B.x, this.B.y);

        ctx.moveTo(this.C.x, this.C.y);
        ctx.lineTo(this.D.x, this.D.y);
        ctx.stroke();

        this.drawDot(ctx, this.A, "A");
        this.drawDot(ctx, this.B, "B");
        this.drawDot(ctx, this.C, "C");
        this.drawDot(ctx, this.D, "D");

        if (this.I) {
            this.drawDot(ctx, this.I, "I");
        }
    }

    drawDot(ctx, point, label) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 14px serif";
        ctx.fillText(label, point.x, point.y);
    }
}
