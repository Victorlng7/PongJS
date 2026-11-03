import { Ball } from "./entities/ball.ts";
import { Paddle } from "./entities/padle.ts";
import { Key } from "./keys/keys.ts";
import { Render } from "./render.ts";

export class Game {
    //Caneva de rendu du jeu
    private rendu: Render;

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
        this.rendu = new Render(ctx);

        this.paddle1 = new Paddle(50, ctx);
        this.paddle2 = new Paddle(750, ctx);

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
                this.draw();
            }
        });
    }

    private boucleJeu = (timestamp: number): void => {
        const elapsed = timestamp - this.lastFrameTime;

        if (elapsed >= this.frameDuration) {
            const deltaTime = elapsed / 1000;

            this.lastFrameTime = timestamp;

            this.updateGame(deltaTime);

            this.rendu.render();
            this.draw();
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

    updateGame(deltaTime: number) {
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

        this.ball.moove(
            this.ball.getVelX() * deltaTime,
            this.ball.getVelY() * deltaTime,
        );
        if (this.ball.getPosX() <= 25 || this.ball.getPosX() >= 775) {
            this.ball.setVelX(this.ball.getVelX() * -1);
            this.ball.addVelX();
        }
        if (this.ball.getPosY() <= 25 || this.ball.getPosY() >= 425) {
            this.ball.setVelY(this.ball.getVelY() * -1);
            this.ball.addVelY();
        }
    }
}
