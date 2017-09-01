import FigureBounds from './figureBounds';

export default class Resize {

    private _deltaX: number;
    private _deltaY: number;

    constructor(
        public readonly anchorX: number,
        public readonly anchorY: number,
        deltaX: number,
        deltaY: number
    ) {
        this._deltaX = deltaX;
        this._deltaY = deltaY;
    }

    get deltaX() { return this._deltaX; }

    get deltaY() { return this._deltaY; }

    transform(bounds: FigureBounds) {
        const minX = bounds.minX + (this._deltaX * (1 - this.anchorX));
        const minY = bounds.minY + (this._deltaY * (1 - this.anchorY));
        const maxX = bounds.maxX + (this._deltaX * this.anchorX);
        const maxY = bounds.maxY + (this._deltaY * this.anchorY);
        return new FigureBounds(minX, minY, maxX, maxY);
    }

    setDelta(deltaX: number, deltaY: number) {
        this._deltaX = deltaX;
        this._deltaY = deltaY;
    }
}
