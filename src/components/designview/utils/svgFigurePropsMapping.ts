import { FigureValues } from '../../../store/model/figure';
import FigureBounds from '../../../store/model/FigureBounds';

enum PropSource {
    BOUNDS, VALUES
}

type PropMapping = {
    from: [ PropSource, string ],
    to: string,
    defaultVal: string
}

const attrMappings: PropMapping[] = [
    {
        from: [PropSource.BOUNDS, 'x'],
        to: 'x',
        defaultVal: '0'
    },
    {
        from: [PropSource.BOUNDS, 'y'],
        to: 'y',
        defaultVal: '0'
    },
    {
        from: [PropSource.BOUNDS, 'width'],
        to: 'width',
        defaultVal: '50'
    },
    {
        from: [PropSource.BOUNDS, 'height'],
        to: 'height',
        defaultVal: '50'
    }
]

const styleMappings: PropMapping[] = [
    {
        from: [PropSource.VALUES, 'fill'],
        to: 'fill',
        defaultVal: 'black'
    }
]

export function mapSvgShapeProps(figureBounds: FigureBounds, props: FigureValues) {
    const extract = createExtractor(figureBounds, props);

    const attrs: { [key: string]: string } = {};
    const style: { [key: string]: string } = {};


    for(let attrMapping of attrMappings) {
        let v = extract(attrMapping.from);
        attrs[attrMapping.to] = v == null ? attrMapping.defaultVal : v;
    }

    for(let styleMapping of styleMappings) {
        let v = extract(styleMapping.from);
        style[styleMapping.to] = v == null ? styleMapping.defaultVal : v;
    }

    return { attrs, style };
}

function createExtractor(bounds: FigureBounds, props: FigureValues) {
    return ([ source, propKey ]: [PropSource, string]) => {
        switch(source) {
            case PropSource.BOUNDS: {
                if(propKey === 'x') {
                    return '' + bounds.minX;

                } else if(propKey === 'y') {
                    return '' + bounds.minY;

                } else if(propKey === 'width') {
                    return '' + bounds.width;

                } else if(propKey === 'height') {
                    return '' + bounds.height;
                }
            }
            default: 
                return props[propKey];
        }
    }
}

export function mapSvgGroupProps(dragOffsetX: number, dragOffsetY: number) {
    return {
        attrs: {
            transform: `translate(${dragOffsetX}, ${dragOffsetY})`
        }
    }
}
