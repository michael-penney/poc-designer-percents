import Vue from 'vue';
import { Payload, MutationTree } from 'vuex';

import StoreState from './model/store';
import FigureBounds from './model/figureBounds';
import Resize from './model/resize';
import Figure, { FigureValues  } from './model/figure';
import { addChildToFigure } from './utils/figureGroupUtils';

export const ADD_FIGURE = 'addFigure';
export const REMOVE_FIGURE = 'removeFigure';
export const SELECT_FIGURE = 'selectFigure';
export const SET_FIGURE_PROP_VALUE = 'setFigurePropValues'
export const SET_FIGURE_ABSOLUTE_POSITION = 'setFigureAbsolutePosition'
export const TOGGLE_ADD_CHILD = 'toggleAddChild';
export const ADD_FIGURE_CHILD = 'addFigureChild';
export const SET_FIGURE_BOUNDS = 'setFigureBounds';
export const BEGIN_RESIZING_SELECTED_FIGURE = 'beginResizingSelectedFigure';
export const UPDATE_RESIZE_SELECTED_FIGURE = 'updateResizeSelectedFigure';
export const CLEAR_RESIZE = 'clearResize';
export const CLEAR_SELECTION = 'clearSelection'

export class ClearSelectionPayload implements Payload {
    type = CLEAR_SELECTION
}

export class ClearResizePayload implements Payload {
    type = CLEAR_RESIZE
}

export class AddFigurePayload implements Payload {
    type = ADD_FIGURE
    constructor(
        public readonly figure: Figure) { }
}

export class RemoveFigurePayload implements Payload {
    type = REMOVE_FIGURE
    constructor(
        public readonly figure: Figure) { }
}

export class SelectFigurePayload implements Payload {
    type = SELECT_FIGURE
    constructor(
        public readonly figure: Figure|null) { }
}

export class SetFigurePropValuesPayload implements Payload {
    type = SET_FIGURE_PROP_VALUE
    constructor(
        public readonly figure: Figure,
        public readonly values: { [key: string]: string }) { }
}

export class SetFigureAbsolutePositionPayload implements Payload {
    type = SET_FIGURE_ABSOLUTE_POSITION
    constructor(
        public readonly figure: Figure,
        public readonly x: number,
        public readonly y: number,
        public readonly width: number,
        public readonly height: number) { }
}

export class ToggleAddChildPayload implements Payload {
    type = TOGGLE_ADD_CHILD
}

export class AddFigureChildPayload implements Payload {
    type = ADD_FIGURE_CHILD
    constructor(
        public readonly figure: Figure) { }
}

export class SetFigureBoundsPayload implements Payload {
    type = SET_FIGURE_BOUNDS
    constructor(
        public readonly figure: Figure,
        public readonly figureBounds: FigureBounds) {}
}

export class BeginResizingSelectedFigurePayload implements Payload {
    type = BEGIN_RESIZING_SELECTED_FIGURE
    constructor(
        public readonly anchorX: number,
        public readonly anchorY: number) {}
}

export class UpdateResizeSelectedFigurePayload implements Payload {
    type = UPDATE_RESIZE_SELECTED_FIGURE
    constructor(
        public readonly deltaX: number,
        public readonly deltaY: number) {}
}

const positionParamsKeys = ['x', 'y', 'width', 'height', 'anchorX', 'anchorY'];
const mutations: MutationTree<StoreState> = {
    [ADD_FIGURE] (state, payload: AddFigurePayload) {
        const figure = payload.figure;
        state.figures.push(figure);
    },

    [REMOVE_FIGURE] (state, payload: RemoveFigurePayload) {
        // remove figure from parent
        let figure = payload.figure;
        if(figure.parent == null) {
            state.figures.splice(state.figures.indexOf(figure), 1);
        } else {
            figure.parent.children.splice(state.figures.indexOf(figure), 1);
        }

        // clear selected figure
        if(state.selectedFigure === payload.figure) {
            state.selectedFigure = null;
        }

        // delete figureBounds of itself and children
        const cs = [figure];
        while(cs.length > 0) {
            figure = cs.pop()!;
            Vue.delete(state.figureBounds, figure.id);
            Array.prototype.push.apply(cs, figure.children);
        }
    },

    [SELECT_FIGURE] (state, payload: SelectFigurePayload) {
        state.selectedFigure = payload.figure;
    },

    [SET_FIGURE_PROP_VALUE] (state, payload: SetFigurePropValuesPayload) {
        // assign prop-values from the payload
        const figure = payload.figure;
        Object.entries(payload.values).forEach(([key, value]) => {
            if(figure.propValues.hasOwnProperty(key)) {
                figure.propValues[key] = value;
                
            } else {
                // call Vue.set to make vue track changes to the new property
                Vue.set(figure.propValues, key, value);
            }
        });
    },

    [SET_FIGURE_ABSOLUTE_POSITION] (state, payload: SetFigureAbsolutePositionPayload) {
        const figure = payload.figure;
        let x = payload.x;
        let y = payload.y;
        
        // convert absolute -> relative position
        if(figure.parent) {
            const parentBounds = state.figureBounds[figure.parent.id];
            if(parentBounds) {
                x -= parentBounds.minX;
                y -= parentBounds.minY;
            }
        }

        for(let k of positionParamsKeys) {
            figure.propValues[k] = '';
        }

        figure.propValues.x = '' + x;
        figure.propValues.y = '' + y;
        figure.propValues.width = '' + payload.width;
        figure.propValues.height = '' + payload.height;
    },

    [TOGGLE_ADD_CHILD] (state, payload: ToggleAddChildPayload) {
        state.addChildMode = !state.addChildMode;
    },

    [ADD_FIGURE_CHILD] (state, payload: AddFigureChildPayload) {
        const selectedFigure = state.selectedFigure;
        const figure = payload.figure;
        if(selectedFigure != null && figure !== selectedFigure) {
            addChildToFigure(state.figures, selectedFigure, figure);

            // clear add-child mode
            state.addChildMode = false;
        }
    },

    [SET_FIGURE_BOUNDS] (state, payload: SetFigureBoundsPayload) {
        const figureId = payload.figure.id;
        if(!state.figureBounds.hasOwnProperty(figureId)) {
            Vue.set(state.figureBounds, figureId, payload.figureBounds);
        } else {
            state.figureBounds[figureId] = payload.figureBounds;
        }
    },

    [BEGIN_RESIZING_SELECTED_FIGURE] (state, payload: BeginResizingSelectedFigurePayload) {
        state.resize = new Resize(payload.anchorX, payload.anchorY, 0, 0);
    },

    [UPDATE_RESIZE_SELECTED_FIGURE] (state, payload: UpdateResizeSelectedFigurePayload) {
        const resize = state.resize;
        if(resize != null) {
            resize.setDelta(payload.deltaX, payload.deltaY);
        }
    },

    [CLEAR_RESIZE] (state) {
        state.resize = null;
    },

    [CLEAR_SELECTION] (state){
        state.selectedFigure = null;
    }
}

export default mutations;
