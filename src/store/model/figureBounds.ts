export default class FigureBounds {

    constructor(
        public readonly minX: number,
        public readonly minY: number,
        public readonly maxX: number,
        public readonly maxY: number) { }

    get width() { 
        return this.maxX - this.minX;
    }

    get height() {
        return this.maxY - this.minY;
    }

    union(other: FigureBounds): FigureBounds {
        const minX = Math.min(this.minX, other.minX);
        const minY = Math.min(this.minY, other.minY);
        const maxX = Math.max(this.maxX, other.maxX);
        const maxY = Math.max(this.maxY, other.maxY);
        return new FigureBounds(minX, minY, maxX, maxY);
    }
}
