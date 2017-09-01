import Vue from "vue";
import AppComponent from './components/App.vue';
import './styles/index';
import store from './store/index';

let v = new Vue({
    el: "#app",
    store,
    template: '<app-component/>',
    data: {
        name: "World"
    },
    components: {
        AppComponent
    }
});