import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

var API_ROOT = '/api'

// Keep a global app object for compatibility
var app = app || {}

export default new Vuex.Store({
  timeoutId: null,
  state: {
    apiRoot: API_ROOT,
    user: '',
    token: '',
    proposal: '',
    visit: ''
  },
  mutations: {
      save_proposal(state, prop) {
        console.log("Saved proposal " + prop)
        state.proposal = prop
        app.prop = prop
      },
      clear_proposal(state) {
        state.proposal = ''
        app.prop = ''
      },
      save_visit(state, visit) {
        state.visit = visit
      },
      clear_visit(state) {
        state.visit = ''
      },      
      auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
        sessionStorage.setItem('token', token)
      },
      auth_error(state){
        state.status = 'error'
        sessionStorage.removeItem('token')
      },
      logout(state){
        state.status = ''
        state.token = ''
        sessionStorage.removeItem('token')
      },      
    },
  actions: {
    login({commit}, credentials){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: API_ROOT + '/authenticate', data: credentials, method: 'POST' })
          .then(resp => {
            const token = resp.data.jwt
            const user = credentials.login // Using passed fed id at the moment
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            reject(err)
          })
        })
    },
    logout({commit}){
        return new Promise((resolve, reject) => {
          commit('logout')
          resolve()
        })
      }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    token: function(state) {
      if (!state.token) {
        // Any in storage?
        state.token = sessionStorage.getItem('token')
      }
      return state.token
    },
    authStatus: state => state.status,
    apiRoot: state => state.apiRoot,
    currentProposal: state => state.proposal,
  }
  }
)
