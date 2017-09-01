<template>
    <div id="design-view">
        <svg id="design-view-canvas" ref="canvas" @click="handleCanvasClicked" @keyup.delete="handleKeyPress">
            <design-figure v-for="figure in figures"
                :key="figure.id"
                :figure="figure"
                :canvas="$refs.canvas"
                :parentBounds="canvasBounds"/>
            <resize-handles-container :canvas="$refs.canvas"/>
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import store from '../../store/index';
import { ClearSelectionPayload, RemoveFigurePayload } from '../../store/mutations';

import DesignFigure from './DesignFigure';
import FigureBounds from '../../store/model/figureBounds';
import ResizeHandlesContainer from './ResizeHandlesContainer.vue';

export default Vue.component('design-view', {
    components: {
        DesignFigure,
        ResizeHandlesContainer
    },
    computed: {
        figures() {
            return store.state.figures;
        },
        canvasBounds() {
            // TODO: calculate from canvas bounds
            return new FigureBounds(0, 0, 1000, 1000);
        }
    },
    created() {
        window.addEventListener('keyup', function(event) {
            if (event.keyCode == 46) { 
                const selectedFigure = store.state.selectedFigure;
                if(selectedFigure != null) {
                    store.commit(new RemoveFigurePayload(selectedFigure));
                }
            }
        });
    },
    methods: {
        handleCanvasClicked(e: MouseEvent) {
            if(e.srcElement === this.$refs.canvas) {
                store.commit(new ClearSelectionPayload())
            }
        },
        handleKeyPress(e: KeyboardEvent) {
            const selectedFigure = store.state.selectedFigure;
            if(selectedFigure != null) {
                store.commit(new RemoveFigurePayload(selectedFigure));
            }
        }
    }
})
</script>

<style lang="scss">
    #design-view {
        flex-grow: 1;
        overflow: hidden;
        position: relative;
    }

    #design-view-canvas {
        width: 100%;
        height: 100%;
    }
</style>

