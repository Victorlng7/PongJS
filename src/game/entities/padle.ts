export class Paddle {
    private width: number;
    private height: number;

    private posY: number;
    private posX: number;

    private ctx: CanvasRenderingContext2D;

    constructor(posX: number, ctx: CanvasRenderingContext2D) {
        this.width = 10;
        this.height = 100;

        this.posY = 175;
        this.posX = posX;

        this.ctx = ctx;
    }

    getWidth(): number {
        return this.width;
    }
    getHeight(): number {
        return this.height;
    }
    getPosY(): number {
        return this.posY;
    }
    getPosX(): number {
        return this.posX;
    }

    setPosY(v: number) {
        if (this.posY + v >= -1 && this.posY + v <= 350) {
            this.posY += v;
        }
    }

    draw(): void {
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    default() {
        this.posY = 175;
    }
}
