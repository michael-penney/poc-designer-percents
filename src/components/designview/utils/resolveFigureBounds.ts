import FigureBounds from '../../../store/model/figureBounds';
import Figure, { FigureValues } from '../../../store/model/figure';

export function computeChildBounds(bounds: FigureBounds, figureValues: FigureValues) {
    let { minX, minY, maxX, maxY } = bounds;

    // apply paddding
    if(isNotBlank(figureValues.padLeft)) {
        minX += resolve(figureValues.padLeft, bounds.width);
    }

    if(isNotBlank(figureValues.padRight)) {
        maxX -= resolve(figureValues.padRight, bounds.width);
    }

    if(isNotBlank(figureValues.padTop)) {
        minY += resolve(figureValues.padTop, bounds.height);
    }

    if(isNotBlank(figureValues.padBottom)) {
        maxY -= resolve(figureValues.padBottom, bounds.height);
    }
    return new FigureBounds(minX, minY, maxX, maxY);
}

export function computeFigureBounds(parentBounds: FigureBounds, figureValues: FigureValues) {
    const originPt = getOriginPoint(parentBounds, figureValues);
    return getFinalBounds(parentBounds, originPt, figureValues);
}

function getOriginPoint(paddedBounds: FigureBounds, figureValues: FigureValues): [number, number] {
    let x = paddedBounds.minX;
    let y = paddedBounds.minY;

    if(isNotBlank(figureValues.x)) {
        x += resolve(figureValues.x, paddedBounds.width);
    }

    if(isNotBlank(figureValues.y)) {
        y += resolve(figureValues.y, paddedBounds.height);
    }

    return [x, y];
}

function getFinalBounds(paddedBounds: FigureBounds, originPt: [number, number], figureValues: FigureValues): FigureBounds {
    let anchorX = 0;
    let anchorY = 0;
    let width = 50;
    let height = 50;

    if(isNotBlank(figureValues.width)) {
        width = resolve(figureValues.width, paddedBounds.width);
    }

    if(isNotBlank(figureValues.height)) {
        height = resolve(figureValues.height, paddedBounds.height);
    }

    if(isNotBlank(figureValues.anchorX)) {
        anchorX = parseFloat(figureValues.anchorX);
    }

    if(isNotBlank(figureValues.anchorY)) {
        anchorY = parseFloat(figureValues.anchorY);
    }

    const minX = originPt[0] - width * anchorX;
    const maxX = originPt[0] + width * (1 - anchorX);
    const minY = originPt[1] - height * anchorY;
    const maxY = originPt[1] + height * (1 - anchorY);
    return new FigureBounds(minX, minY, maxX, maxY);
}


function isNotBlank(v: string|null|undefined) {
    return v != null && v != '';
}

function resolve(value: string, scale: number) {
    let num: number;
    if(value.endsWith('%')) {
        num = parseFloat(value.substring(0, value.length - 1));
        num = scale / 100 * num;

    } else {
        num = parseFloat(value);
    }
    
    return num;
}
