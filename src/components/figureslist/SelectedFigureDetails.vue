<template>
    <div v-if="selectedFigure != null">
        <figure-details-component :figure="selectedFigure"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '../../store/index';
import FigureDetailsComponent from './FigureDetails.vue';

export default Vue.component('selected-figure-details', {
    components: {
        FigureDetailsComponent
    },
    computed: {
        selectedFigure() {
            return store.state.selectedFigure;
        }
    }
})
</script>
