import Vue from 'vue'
import Vuex from 'vuex'

import MarionetteApp from 'views/marionette/app.js'
import Backbone from 'backbone'

Vue.use(Vuex)

var API_ROOT = '/api'

// Keep a global app object for compatibility
window.app = MarionetteApp()

export default new Vuex.Store({
  state: {
    // Flag we use to check if we have already setup prop/token
    initialised: false,
    // Global api prefix
    apiRoot: API_ROOT,
    user: '',
    staff: false,
    token: '',
    proposal: '',
    visit: '',
    notification: {
      level: '',
      message: ''
    }
  },
  mutations: {
      save_proposal(state, prop) {
        state.proposal = prop
        sessionStorage.setItem('prop', prop)
        // Legacy app
        app.prop = state.proposal
      },
      clear_proposal(state) {
        state.proposal = ''
        sessionStorage.removeItem('prop')
        // Legacy app
        app.prop = state.proposal
      },
      save_visit(state, visit) {
        state.visit = visit
      },
      clear_visit(state) {
        state.visit = ''
      },      
      set_notification(state, payload) {
        console.log("Setting notification " + payload.message)
        state.notification.level = payload.level
        state.notification.message = payload.message
      },
      clear_notification(state) {
        console.log("Clearing notification")
        state.notification = {level: '', message: ''}
      },      
      auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
        sessionStorage.setItem('token', token)
        // Preserve legacy app
        app.token = state.token
      },
      auth_error(state){
        state.status = 'error'
        state.token = ''
        sessionStorage.removeItem('token')
      },
      logout(state){
        state.status = ''
        state.token = ''
        state.proposal = ''
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('prop')
        // Preserve legacy app
        app.token = state.token
        app.prop = state.prop
      },      
  },
  actions: {
    initialise({commit}) {
      if (!this.state.initialised) {
        window.app.apiurl = this.state.apiRoot
        
        // Get any stored value from sessionStorage
        var prop = sessionStorage.getItem('prop')
        var token = sessionStorage.getItem('token')
  
        console.log("INITIALISE STORE, prop = " + prop)

        commit('save_proposal', prop)
        commit('auth_success', token)

        this.state.initialised = true
      }
    },
    log({commit}, url) {
      console.log("Store tracking url: " + url)
    },
    getUser({commit}, credentials) {
      return new Promise((resolve, reject) => {
        commit('auth_request')

        Backbone.ajax({
          url: this.state.apiRoot+'/users/current',
          success: function(resp) {
            const token = resp.data.jwt
            const user = credentials.login // Using passed fed id at the moment
            commit('auth_success', token, user)
            resolve(resp)
          },
          error: function(req, status, error) {
            commit('auth_error')
            reject(req)
          }})
        })
    },
    login({commit}, credentials) {
      return new Promise((resolve, reject) => {
        commit('auth_request')

        Backbone.ajax({
          url: this.state.apiRoot+'/authenticate',
          data: credentials,
          type: 'POST',
          success: function(resp) {
            const token = resp.jwt
            const user = credentials.login // Using passed fed id at the moment
            commit('auth_success', token, user)
            resolve(resp)
          },
          error: function(req, status, error) {
            commit('auth_error')
            reject(req)
          }})
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
    isStaff: state => state.staff,
    token: function(state) {
      if (!state.token) {
        // Any in storage?
        state.token = sessionStorage.getItem('token')
      }
      return state.token
    },
    authStatus: state => state.status,
    apiRoot: state => state.apiRoot,
    currentProposal: function(state) {
      // If we have no proposal set, check if there is one in storage
      if (!state.proposal) {
        let prop = sessionStorage.getItem('prop')
        if (prop) {
          state.proposal = prop
          app.prop = state.proposal
        } else {
          state.proposal = ''
        }
      }
      return state.proposal
    },
    notification: state => state.notification,
  }
})
