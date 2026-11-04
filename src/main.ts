import { Game } from "./game/game.ts";

const canvas = document.querySelector<HTMLCanvasElement>("#caneva-jeu");

if (!canvas) {
    throw new Error("Canvas introuvable");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error("Contexte 2D indisponible");
}

const buttonLancer = document.querySelector<HTMLButtonElement>("#lancer");
const buttonReset = document.querySelector<HTMLButtonElement>("#reset");

if (buttonLancer && buttonReset) {
    const jeu = new Game(ctx);

    jeu.relancerJeu();

    buttonLancer.addEventListener("click", () => {
        jeu.lancerJeu();
        jeu.setLoop(true);
    });

    buttonReset.addEventListener("click", () => {
        jeu.resetjeu();
    });
}

export function assignerScore(score1: number, score2: number) {
    const scoreForm1 = document.querySelector<HTMLSpanElement>("#score1");
    const scoreForm2 = document.querySelector<HTMLSpanElement>("#score2");

    if (scoreForm1 && scoreForm2) {
        scoreForm1.textContent = score1.toString();
        scoreForm2.textContent = score2.toString();
    }
}
