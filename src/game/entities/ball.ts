export class Ball {
    private posY: number;
    private posX: number;

    private dirX: number;
    private dirY: number;

    private velX: number;
    private velY: number;

    private radius: number;
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.posX = 400;
        this.posY = 200;

        this.dirX = 1;
        this.dirY = 0;

        this.velX = 1;
        this.velY = 1;

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

    setPos(x: number, y: number) {
        this.clear();

        this.posX += x;
        this.posY += y;

        this.draw();
    }

    clear() {
        this.ctx.clearRect(
            this.posX - this.radius,
            this.posY - this.radius,
            this.radius * 2,
            this.radius * 2,
        );
    }

    draw() {
        this.ctx.beginPath();

        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);

        this.ctx.fill();
    }
}
