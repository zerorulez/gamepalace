import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token')
    },
    mutations: {
        setToken (state) {
            state.token = localStorage.getItem('token')
        }
    }
})