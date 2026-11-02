import { ball } from "./game/entities/ball.ts";
import { Paddle } from "./game/entities/padle.ts";

const canvas = document.querySelector<HTMLCanvasElement>("#caneva-jeu");

if (!canvas) {
    throw new Error("Canvas introuvable");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error("Contexte 2D indisponible");
}

ctx.fillStyle = "black";

const p1 = new Paddle(50, ctx);
const p2 = new Paddle(750, ctx);

const b = new ball(ctx);

p1.draw();
p2.draw();

b.draw();

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
        p1.setPosY(5);
    } else if (event.key === "ArrowUp") {
        p1.setPosY(-5);
    }
});
