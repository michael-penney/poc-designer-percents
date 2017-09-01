import FigureBounds from './FigureBounds';

export interface RequiredFigureValues {
    x: string;
    y: string;
    width: string;
    height: string;
}

export interface FigureValues extends RequiredFigureValues {
    [propKey : string]: string
}

export default class Figure {
    parent: Figure|null = null;
    children: Figure[] = [];
    
    constructor(
        public readonly id: string,
        public readonly type: string,
        public propValues: FigureValues,
    ) { }
}

