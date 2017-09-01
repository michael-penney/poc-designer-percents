<template>
    <div id="figures-list">
        <figures-list-item-component v-bind:key="figure.id" v-for="figure in figures" :figure="figure"/>
        <button @click="createFigure()">Add Figure</button>
        <button v-if="showAddChildButton" @click="toggleAddChild()">{{ !addChildMode ? 'Add Child' : 'Cancel' }}</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';

import Figure from '../../store/model/figure';

import figuresListItemComponent from './FiguresListItem.vue';
import store from '../../store/index';
import { AddFigurePayload, ToggleAddChildPayload } from '../../store/mutations';
import { createDefaultFigureValues } from '../../data/FigureProps';

let idsCount = 0;

@Component({
    components: {
        figuresListItemComponent
    }
})
export default class FiguresList extends Vue {

    createFigure() {
        const newId = 'id_' + idsCount++;
        const figureValues = createDefaultFigureValues();
        const figure = new Figure(newId, 'rect', figureValues);
        store.commit(new AddFigurePayload(figure));
    }

    toggleAddChild() {
        store.commit(new ToggleAddChildPayload());
    }

    get showAddChildButton() {
        return store.state.selectedFigure != null || store.state.addChildMode;
    }

    get addChildMode() {
        return store.state.addChildMode;
    }

    get figures() {
        return store.state.figures;
    }
}
</script>

<style lang="scss">
    #figures-list {
        flex-grow: 1;
    }
</style>

