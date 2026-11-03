import { Ball } from "./entities/ball.ts";
import { Paddle } from "./entities/padle.ts";
import { Key } from "./keys/keys.ts";

export class Game {
    private ctx: CanvasRenderingContext2D;

    private paddle1: Paddle;
    private paddle2: Paddle;

    private ball: Ball;
    private key: Key;

    constructor(ctx: CanvasRenderingContext2D) {
        //Initialisation valeur de la classe
        this.ctx = ctx;

        this.paddle1 = new Paddle(50, this.ctx);
        this.paddle2 = new Paddle(750, this.ctx);

        this.ball = new Ball(ctx);
        this.key = new Key();
    }

    lancerJeu() {
        window.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                this.boucleJeu();
            }
        });
    }

    boucleJeu() {
        this.updateGame();
    }

    draw() {
        //Dessin des différentes instances
        this.paddle1.draw();
        this.paddle2.draw();
        this.ball.draw();
    }

    updateGame() {
        this.draw();

        window.addEventListener("keydown", (event) => {
            this.key.setKey(event);
        });
        window.addEventListener("keyup", (_event) => {
            this.key.deletKey();
        });
    }
}
