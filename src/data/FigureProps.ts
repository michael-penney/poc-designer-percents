import { FigureValues } from '../store/model/figure';

export interface FigureProp {
    name: string;
    defaultValue: string;
};

export const figurePropGroups =[
    ['x', 'y', 'width', 'height', 'fill'],
    ['anchorX', 'anchorY'],
    ['padLeft', 'padRight', 'padTop', 'padBottom'],
];

export const figureProps = new Map<string, FigureProp>();

figureProps.set('x', {
    name: 'x',
    defaultValue: '0'
});

figureProps.set('y', {
    name: 'y',
    defaultValue: '0'
});

figureProps.set('width', {
    name: 'width',
    defaultValue: '50'
});

figureProps.set('height', {
    name: 'height',
    defaultValue: '50'
});

figureProps.set('fill', {
    name: 'fill',
    defaultValue: 'black'
});

figureProps.set('anchorX', {
    name: 'anchor-x',
    defaultValue: ''
});

figureProps.set('anchorY', {
    name: 'anchor-y',
    defaultValue: ''
})

figureProps.set('padLeft', {
    name: 'pad left',
    defaultValue: ''
});

figureProps.set('padRight', {
    name: 'pad right',
    defaultValue: ''
});

figureProps.set('padTop', {
    name: 'pad top',
    defaultValue: ''
});

figureProps.set('padBottom', {
    name: 'pad bottom',
    defaultValue: ''
});

export function createDefaultFigureValues(): FigureValues {
    const result: any = { }
    for(let key of figureProps.keys()) {
        const figureProp = figureProps.get(key);
        if(figureProp != null) {
            result[key] = figureProp.defaultValue;
        }
    }
    return result;
}
