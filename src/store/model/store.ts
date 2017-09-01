import Figure from './figure';
import FigureBounds from './figureBounds';
import Resize from './resize';

interface StoreState {
    figures: Figure[];
    addChildMode: boolean;
    selectedFigure: Figure | null;
    resize: Resize | null
    figureBounds: {
        [figureId: string]: FigureBounds
    };
}

export default StoreState;
