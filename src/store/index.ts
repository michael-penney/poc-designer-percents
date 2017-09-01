import Vue from 'vue';
import Vuex, { Payload } from 'vuex';
import Store from './model/store';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store<Store>({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        figures: [],
        figureBounds: {},
        resize: null,
        addChildMode: false,
        selectedFigure: null
    },
    mutations,
    actions,
    getters
})

export default store;
