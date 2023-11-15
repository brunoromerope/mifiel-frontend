import { createStore } from 'vuex'
import axios from 'axios'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            user: null,
            url: 'http://192.141.125.8:6868',
            base64: null
        }
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        },
        setBase64 (state, payload) {
            state.base64 = payload
        }
    },
    actions: {
        setUser ({commit}, payload) {
            commit('setUser', payload);
        },
        setBase64Content ({ commit }, payload) {
            commit('setBase64', payload);
        }

    },
    getters: {
        user (state) {
            return state.user
        },
        url (state) {
            return state.url
        },
        base64 (state) {
            return state.base64
        }
    }
})

export default store