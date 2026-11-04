export class Render {
    //Attribut "globale"
    private canvas: CanvasRenderingContext2D;

    //Dimention
    private width;
    private height;

    constructor(ctx: CanvasRenderingContext2D) {
        this.canvas = ctx;

        this.width = 800;
        this.height = 450;
    }

    getCtx(): CanvasRenderingContext2D {
        return this.canvas;
    }

    public render() {
        this.canvas.clearRect(0, 0, this.width, this.height);
    }
}
