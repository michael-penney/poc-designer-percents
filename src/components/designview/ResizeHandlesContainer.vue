<template>
    <g v-if="hasSelectedFigure">
        <rect class="svg-figure-bounds" :x="outerMinX" :y="outerMinY" :width="outerWidth" :height="outerHeight"/>
        <resize-handle :anchorX="0" :anchorY="0" :x="minX" :y="minY" :figure="figure" :canvas="canvas"/>
        <resize-handle :anchorX="0" :anchorY="1" :x="minX" :y="maxY" :figure="figure" :canvas="canvas"/>
        <resize-handle :anchorX="1" :anchorY="0" :x="maxX" :y="minY" :figure="figure" :canvas="canvas"/>
        <resize-handle :anchorX="1" :anchorY="1" :x="maxX" :y="maxY" :figure="figure" :canvas="canvas"/>
        <circle class="svg-anchor" :cx="anchorX" :cy="anchorY" r="10"/> 
    </g>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import ResizeHandle from './ResizeHandle.vue';

import FigureBounds from '../../store/model/figureBounds';
import Figure from '../../store/model/Figure';
import store from '../../store/index';

const DEFAULT_FIGURE_BOUNDS = new FigureBounds(0, 0, 10, 10);

@Component({
    props: ["canvas"],
    components: {
        ResizeHandle 
    }
})
export default class ResizeHandlesContainer extends Vue{
    
    get figureBounds() {
        const selectedFigure = this.figure;
        if(selectedFigure != null) {
            const figureBounds = store.state.figureBounds[selectedFigure.id];
            if(figureBounds) {
                const resize = store.state.resize;

                if(resize) {
                    return resize.transform(figureBounds);
                }
                return figureBounds;
            }
        }
        return DEFAULT_FIGURE_BOUNDS;
    }

    get figureBoundsOuter() {
        const figure = this.figure;
        if(figure != null) {

            let bounds = this.figureBounds;
            const children = [ ...figure.children];

            while(children.length > 0) {
                const child = children.pop()!;
                const childBounds = store.state.figureBounds[child.id];
                childBounds && (bounds = bounds.union(childBounds));
                Array.prototype.push.apply(children, child.children);
            }
            return bounds;
        }
        return DEFAULT_FIGURE_BOUNDS;
    }

    get figure() {
        return store.state.selectedFigure;
    }

    get hasSelectedFigure() {
        return this.figure != null;
    }

    get minX() {
        return this.figureBounds.minX;
    }

    get maxX() {
        return this.figureBounds.maxX;
    }

    get minY() {
        return this.figureBounds.minY;
    }

    get maxY() {
        return this.figureBounds.maxY;
    }

    get width() {
        return this.figureBounds.width;
    }

    get height() {
        return this.figureBounds.height;
    }

    get outerMinX() {
        return this.figureBounds.minX;
    }

    get outerMinY() {
        return this.figureBounds.minY;
    }

    get outerWidth() {
        return this.figureBounds.width;
    }

    get outerHeight() {
        return this.figureBounds.height;
    }

    get anchorX() {
        return this.minX + this.width * (this.figure ? parseFloat(this.figure.propValues.anchorX || '0') : 0);
    }

    get anchorY() {
        return this.minY + this.height * (this.figure ? parseFloat(this.figure.propValues.anchorY || '0') : 0);
    }
}
</script>

<style lang="scss">
    .svg-figure-bounds {
        fill: none;
        stroke: rgba(0, 0, 255, 0.5);
    }

    .svg-anchor {
        fill: none;
        stroke: rgb(248, 0, 255);
    }  
</style>



