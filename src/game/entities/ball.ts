export class ball {
    private posY: number;
    private posX: number;

    private dirX: number;
    private dirY: number;

    private velX: number;
    private velY: number;

    constructor() {
        this.posX = 400;
        this.posY = 200;

        this.dirX = 1;
        this.dirY = 0;

        this.velX = 1;
        this.velY = 1;
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
}
