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
