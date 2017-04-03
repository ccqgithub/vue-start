import userModule from '../modules/user'

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
  loginUser(state) {
    return state.loginUser;
  }
}

// modules
export let modules = {
  user: userModule,
}
