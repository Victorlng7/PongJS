import { Game } from "./game/game.ts";

const canvas = document.querySelector<HTMLCanvasElement>("#caneva-jeu");

if (!canvas) {
    throw new Error("Canvas introuvable");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error("Contexte 2D indisponible");
}

const jeu = new Game(ctx);

jeu.lancerJeu();
assignerScore();

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jeu.relancerJeu();
    }
});

export function assignerScore() {
    const scoreForm1 = document.querySelector<HTMLSpanElement>("#score1");
    const scoreForm2 = document.querySelector<HTMLSpanElement>("#score2");

    if (scoreForm1 && scoreForm2) {
        scoreForm1.textContent = jeu.getScore1().toString();
        scoreForm2.textContent = jeu.getScore2().toString();
    }
}
