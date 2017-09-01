import { Payload, ActionTree } from 'vuex';
import Store from './model/store';
import Figure from './model/figure';

import { SetFigureAbsolutePositionPayload, ClearResizePayload } from './mutations';

const COMMIT_RESIZE_SELECTED_FIGURE = 'resizeSelectedFigure';
const MOVE_FIGURE = 'moveFigure';

export class MoveFigurePayload implements Payload {
    type=MOVE_FIGURE;
    constructor(
        public readonly figure: Figure,
        public readonly deltaX: number,
        public readonly deltaY: number) {}
}

export class CommitResizeSelectedFigurePayload implements Payload {
    type=COMMIT_RESIZE_SELECTED_FIGURE
}


const actions: ActionTree<Store, Store> = {
    [COMMIT_RESIZE_SELECTED_FIGURE] (store){
        const selectedFigure = store.state.selectedFigure;
        const resize = store.state.resize;

        if(selectedFigure && resize) {
            const figureBounds = store.state.figureBounds[selectedFigure.id];

            if(figureBounds) {
                const newFigureBounds = resize.transform(figureBounds);
                let { minX: x, minY: y, width, height } = newFigureBounds;
                store.commit(new ClearResizePayload());
                store.commit(new SetFigureAbsolutePositionPayload(selectedFigure, x, y, width, height));
            }
        }
    }
}

export default actions;
