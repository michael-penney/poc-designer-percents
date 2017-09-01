<template>
    <div id="page">
        <div id="left-panel">
            <figures-list-component/>
            <figure-details-component/>
        </div>
        <design-canvas-component/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';

    import FiguresListComponent from './figureslist/FiguresList.vue';
    import DesignCanvasComponent from './designview/DesignCanvas.vue';
    import FigureDetailsComponent from './figureslist/SelectedFigureDetails.vue';

    @Component({
        components: {
            FiguresListComponent,
            DesignCanvasComponent,
            FigureDetailsComponent
        }
    })
    export default class App extends Vue { }

</script>

<style>
    #page {
        display: flex;
        width: 100vw;
        height: 100vh;
    }

    #left-panel {
        background-color: grey;
        flex-direction: column;
        display: flex;
        width: 200px;
    }
</style>


