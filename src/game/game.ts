import { TWO_THIRDS_PI } from "chart.js/helpers";
import { Ball } from "./entities/ball.ts";
import { Paddle } from "./entities/padle.ts";
import { Key } from "./keys/keys.ts";

export class Game {
    //Caneva de rendu du jeu
    private ctx: CanvasRenderingContext2D;

    //Entitées
    private paddle1: Paddle;
    private paddle2: Paddle;
    private ball: Ball;

    //touches pressé
    private key: Key;

    //Attribut pour la loop
    private readonly FPS = 60;
    private readonly frameDuration = 1000 / this.FPS;
    private lastFrameTime = 0;

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
            this.key.setKey(event);
        });
        window.addEventListener("keyup", (_event) => {
            this.key.deletKey();
        });

        window.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                requestAnimationFrame(this.boucleJeu);
            }
        });
    }

    private boucleJeu = (timestamp: number): void => {
        const elapsed = timestamp - this.lastFrameTime;

        if (elapsed >= this.frameDuration) {
            this.lastFrameTime = timestamp;

            this.updateGame();
        }
        requestAnimationFrame(this.boucleJeu);
    };
    draw() {
        //Dessin des différentes instances
        //Pas besoin des les clear car le font elles même
        this.paddle1.draw();
        this.paddle2.draw();
        this.ball.draw();
    }

    updateGame() {
        //Lecture des touches
        if (this.key.key) {
            const key: string | null = this.key.key.key;

            if (key === "z") {
                this.paddle1.setPosY(-2);
            } else if (key === "s") {
                this.paddle1.setPosY(2);
            } else if (key === "ArrowUp") {
                this.paddle2.setPosY(-2);
            } else if (key === "ArrowDown") {
                this.paddle2.setPosY(2);
            }
        }
        //Update position de la balle

        //Dessin des différentes chose update
        this.draw();
    }
}
