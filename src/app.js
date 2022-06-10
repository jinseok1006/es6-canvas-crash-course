import Head4 from "./head4.js";
import Head5 from "./head5.js";

export default class App {
    constructor() {
        this.canvas = new Canvas(this.destroyHead.bind(this));
        this.nowHead = null;

        this.addNavClickListener();
        // this.debug();
    }
    addNavClickListener() {
        const navs = document.querySelectorAll("#nav span");
        const heads = [Head4, Head5];

        navs.forEach((nav, i) =>
            nav.addEventListener("click", () => {
                this.destroyHead();
                this.nowHead = new heads[i](this.canvas);
                console.log(this.nowHead);
            })
        );
    }

    debug() {
        new Head4(this.canvas);
    }

    destroyHead() {
        if (this.nowHead) {
            cancelAnimationFrame(this.nowHead.raf);
            window.onkeydown = () => false;
            window.onkeyup = () => false;
        }
    }
}

class Canvas {
    constructor(destroyHead) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.navHeight = document.getElementById("nav").offsetHeight;
        this.destroyHead = destroyHead;

        this.resize();

        window.addEventListener("resize", this.resize.bind(this));
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize() {
        this.canvas.height = window.innerHeight - this.navHeight;
        this.canvas.width = window.innerWidth;
        this.clear();
        this.destroyHead();

        this.ctx.save();
        this.ctx.textBaseline = "top";
        this.ctx.font = "48px serif";
        this.ctx.fillText("Click Nav Contents...", 5, 10);
        this.ctx.restore();
    }
}
