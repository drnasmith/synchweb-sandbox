import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  timeoutId: null,
  state: {
    message: {text: "", isError: false},
    apiRoot: '/api/',
    location: '',
    jwt: ''
  },
  mutations: {
    setMessage(state, payload) {
        state.message.text = payload.text
        state.message.isError = payload.isError
      },
      setToken(state, token) {
        console.log("Setting Store Token to " + token)
        state.jwt = token
      },
    },
  actions: {
    // Use this action to update the message text from any component
    updateMessage(state, payload) {

      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }

      state.commit('setMessage', payload)

      // Reset the message state after a specified interval
      let context = state

      this.timeoutId = setTimeout(function() { 
        context.commit('setMessage', {text:'', isError:false})
      }, 3000)
    }
  },
})
