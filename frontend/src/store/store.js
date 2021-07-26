import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        lightbox: {
            image: '',
            type: '',
            active: false
        },
        firstTime: localStorage.getItem('firstTime') == undefined ? false : true
    },
    mutations: {
        setToken (state, token) {
            localStorage.setItem('token', token)
            state.token = token
        },
        setLightbox(state, payload) {
            state.lightbox.image = payload.image
            state.lightbox.type = payload.type
        },
        toogleLightbox(state) {
            state.lightbox.active = !state.lightbox.active
        },
        toogleModal(state) {
            localStorage.setItem('firstTime', true)
            state.firstTime = true
        }
    }
})