export class Ball {
    //position de la balle
    private posY: number;
    private posX: number;

    //Velociter de la balle
    private velX: number;
    private velY: number;
    private facteurAcceleration: number;
    private velMax: number;

    //Propriété pour draw la balle
    private radius: number;
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.posX = 400;
        this.posY = 200;

        this.velX =
            Math.random() < 0.5
                ? Math.random() * 50 + 100
                : Math.random() * 50 - 150;
        this.velY =
            Math.random() < 0.5
                ? Math.random() * 50 + 100
                : Math.random() * 50 - 150;
        this.facteurAcceleration = 1.1;

        this.velMax = 1000;

        this.radius = 10;
        this.ctx = ctx;
    }

    getPosY(): number {
        return this.posY;
    }

    getPosX(): number {
        return this.posX;
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
        if (Math.abs(this.velX * this.facteurAcceleration) < this.velMax) {
            this.velX *= this.facteurAcceleration;
        }
    }

    setVelY(v: number) {
        this.velY = v;
    }
    addVelY() {
        if (Math.abs(this.velY * this.facteurAcceleration) < this.velMax) {
            this.velY *= this.facteurAcceleration;
        }
    }

    draw() {
        this.ctx.beginPath();

        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);

        this.ctx.fill();
    }
}
