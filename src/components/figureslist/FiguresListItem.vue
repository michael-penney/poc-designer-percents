<template>
    <div>
        <span :class="{ 'figure-selected': isSelected }">{{ figure.type }}</span>
        <ul class="child-list" v-if="hasChildren">
            <li :key="child.id" v-for="child in figureChildren">
                <figures-list-item :figure="child"/>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';

import Figure from '../../store/model/figure';
import store from '../../store/index';

@Component({
    name: 'figures-list-item',
    props: ['figure']
})
export default class FiguresListItem extends Vue{
    figure: Figure;

    get hasChildren() {
        return this.figure.children.length > 0;
    }

    get figureChildren() {
        return this.figure.children;
    }

    get isSelected() {
        return store.state.selectedFigure === this.figure;
    }
}
</script>

<style lang="scss">
    .figure-selected {
        color: red;
    }

    .child-list {
        margin-top: 0;
        margin-bottom: 0;
    }
</style>

