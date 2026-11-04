import { assignerScore } from "../main.ts";
import { Ball } from "./entities/ball.ts";
import { Paddle } from "./entities/padle.ts";
import { Key } from "./keys/keys.ts";
import { Render } from "./render.ts";

export class Game {
    //Caneva de rendu du jeu
    private rendu: Render;
    private ctx: CanvasRenderingContext2D;

    //score
    private score1: number = 0;
    private score2: number = 0;

    //Entitées
    private paddle1: Paddle;
    private paddle2: Paddle;
    private ball: Ball;

    //touches pressé
    private key: Key;

    //Attribut pour la loop
    private loop: boolean = false;
    private readonly FPS = 60;
    private readonly frameDuration = 1000 / this.FPS;
    private lastFrameTime = 0;

    constructor(ctx: CanvasRenderingContext2D) {
        //Initialisation valeur de la classe
        this.rendu = new Render(ctx);
        this.ctx = ctx;

        this.paddle1 = new Paddle(0, ctx);
        this.paddle2 = new Paddle(790, ctx);

        this.ball = new Ball(ctx);
        this.key = new Key();

        this.score1 = 0;
        this.score2 = 0;

        this.setLoop(false);
    }

    getScore1(): number {
        return this.score1;
    }
    getScore2(): number {
        return this.score2;
    }

    setScore(joueur: 1 | 2, clear?: boolean) {
        if (clear) {
            this.score1 = 0;
            this.score2 = 0;
        } else {
            if (joueur === 1) {
                this.score1 += 1;
            } else if (joueur === 2) {
                this.score2 += 1;
            }
        }

        assignerScore(this.score1, this.score2);
    }

    setLoop(b: boolean) {
        this.loop = b;

        this.lastFrameTime = performance.now();
    }

    relancerJeu() {
        //creation d'une nouvelle balle
        this.ball = new Ball(this.ctx);

        //rendu + dessin
        this.draw();

        //lancement de la boucle
        this.lancerJeu();
    }

    resetjeu() {
        //reset position des paddle :
        this.paddle1.default();
        this.paddle2.default();

        //reinitialisation du score
        this.setScore(1, true);

        //arret du jeu
        this.setLoop(false);

        this.relancerJeu();
    }

    lancerJeu() {
        //ajout en continu des touches pressé
        window.addEventListener("keydown", (event) => {
            this.key.setKey(event);
        });
        //suppresion des touches quand elles sont relachées
        window.addEventListener("keyup", () => {
            this.key.deletKey();
        });

        //lancement de la boucle du jeu
        requestAnimationFrame(this.boucleJeu);
    }

    private boucleJeu = (timestamp: number): void => {
        const elapsed = timestamp - this.lastFrameTime;

        if (elapsed >= this.frameDuration && this.loop) {
            const deltaTime = elapsed / 1000;

            this.lastFrameTime = timestamp;

            this.updateGame(deltaTime);

            this.draw();
        }
        requestAnimationFrame(this.boucleJeu);
    };

    draw() {
        //Dessin des différentes instances

        //Suppression avant de dessiner
        this.rendu.render();

        //dessins des entitées
        this.paddle1.draw();
        this.paddle2.draw();
        this.ball.draw();
    }

    updateGame(deltaTime: number) {
        //Lecture des touches
        if (this.key.key) {
            const key: string | null = this.key.key.key;

            if (key === "z") {
                this.paddle1.setPosY(-5);
            } else if (key === "s") {
                this.paddle1.setPosY(5);
            } else if (key === "ArrowUp") {
                this.paddle2.setPosY(-5);
            } else if (key === "ArrowDown") {
                this.paddle2.setPosY(5);
            }
        }
        //Update position de la balle
        this.ball.moove(
            this.ball.getVelX() * deltaTime,
            this.ball.getVelY() * deltaTime,
        );

        if (this.ball.getPosY() <= 12.5 || this.ball.getPosY() >= 437.5) {
            this.ball.setVelY(this.ball.getVelY() * -1);
            this.ball.addVelY();
        }

        //simulation du rebond coté gauche
        if (this.ball.getPosX() <= 22.5) {
            //creation des bordures du paddle
            const borderHautePaddle = this.paddle1.getPosY();
            const borderBassePaddle = this.paddle1.getPosY() + 100;

            //Si en contact --> Rebond
            if (
                this.ball.getPosY() <= borderBassePaddle &&
                this.ball.getPosY() >= borderHautePaddle
            ) {
                this.ball.setVelX(this.ball.getVelX() * -1);
                this.ball.addVelX();
            }
        }
        //simulation du rebond coté droit
        if (this.ball.getPosX() >= 767.5 && this.ball.getPosX() <= 775) {
            //creation des bordures du paddle
            const borderHautePaddle = this.paddle2.getPosY();
            const borderBassePaddle = this.paddle2.getPosY() + 100;

            //Si en contact --> Rebond
            if (
                this.ball.getPosY() <= borderBassePaddle &&
                this.ball.getPosY() >= borderHautePaddle
            ) {
                this.ball.setVelX(this.ball.getVelX() * -1);
                this.ball.addVelX();
            }
        }
        // Point!
        if (this.ball.getPosX() <= 0) {
            this.pointMarquer(2);
        } else if (this.ball.getPosX() >= 800) {
            this.pointMarquer(1);
        }
    }

    pointMarquer(joueur: 1 | 2) {
        this.setScore(joueur);

        this.relancerJeu();
    }
}
