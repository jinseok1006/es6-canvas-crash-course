import Head4 from "./head4.js";

export default class App {
    constructor() {
        this.canvas = new Canvas();

        this.canvas.resize();
        this.addNavClickListener();
    }
    addNavClickListener() {
        const navs = document.querySelectorAll("nav span");
        const heads = [Head4];

        navs.forEach((link, i) => {
            link.addEventListener("click", () => new heads[i]());
        });
    }
}

class Canvas {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.navHeight = document.getElementById("nav").offsetHeight;

        document.getElementById("container").appendChild(this.canvas);
        this.resize();
    }

    resize() {
        this.canvas.height = window.innerHeight - this.navHeight;
        this.canvas.width = window.innerWidth;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
