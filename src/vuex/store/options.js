import userModule from '../modules/user'
import types from '../types/main'

// state
export let state = {
  loginUser: {
    name: 'Season Chen'
  }
}

// mutations
export let mutations = {

}

// actions
export let actions = {}

// getters
export let getters = {
  [types.LOGIN_USER](state) {
    return state.loginUser;
  }
}

// modules
export let modules = {
  user: userModule,
}
