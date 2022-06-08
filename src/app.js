import Head4 from "./head4.js";
import Head5 from "./head5.js";

export default class App {
    constructor() {
        this.canvas = new Canvas();

        // this.addNavClickListener();
        this.debug();
    }
    addNavClickListener() {
        const navs = document.querySelectorAll("#nav span");
        const heads = [Head4, Head5];

        heads.forEach((head, i) => {
            navs[i].addEventListener("click", () => new head(this.canvas));
        });
    }

    debug() {
        new Head4(this.canvas);
    }
}

class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.navHeight = document.getElementById("nav").offsetHeight;

        this.resize();

        window.addEventListener("resize", this.resize.bind(this));
    }

    clear() {
        this.canvas.height = window.innerHeight - this.navHeight;
        this.canvas.width = window.innerWidth;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize() {
        this.clear();

        this.ctx.save();
        this.ctx.textBaseline = "top";
        this.ctx.font = "48px serif";
        this.ctx.fillText("Click Nav Contents...", 0, 0);
        this.ctx.restore();
    }

    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
}
