<template>
    <rect width="10" height="10" class="resize-handle"
        :x="xPos"
        :y="yPos"
        :class="{ dragging: dragging }"
        @mousedown="handleMouseDown"/>
</template>

<script lang="ts">
import Vue from "vue";
import DesignFigure from './DesignFigure';
import store from '../../store/index';
import { CommitResizeSelectedFigurePayload } from '../../store/actions';
import { BeginResizingSelectedFigurePayload,
        UpdateResizeSelectedFigurePayload } from '../../store/mutations';
import Component from 'vue-class-component';
import { beginDrag } from './utils/dragBehaviour';
import Figure from '../../store/model/figure';

@Component({
    props: ['anchorX', 'anchorY', 'x', 'y', 'figure', 'canvas']
})
export default class ResizeHandle extends Vue {
    anchorX: number;
    anchorY: number;
    x: number;
    y: number;
    figure: Figure;
    canvas: Element;

    dragging = false
    startX: number;
    startY: number;

    handleMouseDown(evt: MouseEvent) {
        this.dragging = true;
        this.startX = evt.clientX;
        this.startY = evt.clientY;
        store.commit(new BeginResizingSelectedFigurePayload(this.anchorX, this.anchorY));
        beginDrag(this.canvas, this.handleDragUpdated, this.handleDragComplete);
    }

    handleDragUpdated(evt: MouseEvent) {
        const deltaX = evt.clientX - this.startX;
        const deltaY = evt.clientY - this.startY;
        store.commit(new UpdateResizeSelectedFigurePayload(deltaX, deltaY));
    }

    handleDragComplete() {
        this.dragging = false;
        store.dispatch(new CommitResizeSelectedFigurePayload());
    }

    get xPos() {
        return this.x - 5;
    }

    get yPos() {
        return this.y - 5;
    }
}

</script>

<style lang="scss">
    .resize-handle {
        fill: blue;

        &:not(.dragging):hover {
            fill: orange;
        }
    }

    .dragging {
        fill: orange;
    }
</style>

