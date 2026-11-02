import { Ball } from "./entities/ball.ts";
import { Paddle } from "./entities/padle.ts";

export class Game {
    private ctx: CanvasRenderingContext2D;

    private paddle1: Paddle;
    private paddle2: Paddle;

    private ball: Ball;

    constructor(ctx: CanvasRenderingContext2D) {
        //Initialisation valeur de la classe
        this.ctx = ctx;

        this.paddle1 = new Paddle(50, this.ctx);
        this.paddle2 = new Paddle(750, this.ctx);

        this.ball = new Ball(ctx);
    }

    initJeu() {
        this.paddle1.draw();
        this.paddle2.draw();
        this.ball.draw();
    }

    lancerJeu() {
        this.initJeu();

        window.addEventListener("keydown", (event) => {
            //paddle 1
            if (event.key === "s") {
                this.paddle1.setPosY(5);
            } else if (event.key === "z") {
                this.paddle1.setPosY(-5);
            }

            //paddle 2
            if (event.key === "ArrowDown") {
                this.paddle2.setPosY(5);
            } else if (event.key === "ArrowUp") {
                this.paddle2.setPosY(-5);
            }
        });
    }
}
