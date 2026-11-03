export class Ball {
    private posY: number;
    private posX: number;

    private dirX: number;
    private dirY: number;

    private velX: number;
    private velY: number;
    private facteurAcceleration: number;

    private radius: number;
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.posX = 400;
        this.posY = 200;

        this.dirX = 1;
        this.dirY = 0;

        this.velX =
            Math.random() < 0.5
                ? Math.random() * 50 + 50
                : Math.random() * 50 - 100;
        this.velY =
            Math.random() < 0.5
                ? Math.random() * 50 + 50
                : Math.random() * 50 - 100;
        this.facteurAcceleration = 1.1;

        this.radius = 10;
        this.ctx = ctx;
    }

    getPosY(): number {
        return this.posY;
    }

    getPosX(): number {
        return this.posX;
    }

    getDirX(): number {
        return this.dirX;
    }

    getDirY(): number {
        return this.dirY;
    }

    getVelX(): number {
        return this.velX;
    }

    getVelY(): number {
        return this.velY;
    }

    moove(x: number, y: number) {
        this.posX += x;
        this.posY += y;
    }

    setVelX(v: number) {
        this.velX = v;
    }
    addVelX() {
        this.velX *= this.facteurAcceleration;
    }

    setVelY(v: number) {
        this.velY = v;
    }
    addVelY() {
        this.velY *= this.facteurAcceleration;
    }

    draw() {
        this.ctx.beginPath();

        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);

        this.ctx.fill();
    }
}
