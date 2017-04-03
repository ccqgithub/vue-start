import _ from 'lodash'

export default {
  state: {
    list: []
  },

  mutations: {
    userAdd(state, user) {
      state.list.unshift(user)
    },
    userDelete(state, userId) {
      let index = state.list.findIndex((item, idx) => item.id == userId)
      state.list.splice(index, 1)
    },
    userShuffle(state) {
      state.list = _.shuffle(state.list)
    }
  },

  actions: {
    userAdd({dispatch, commit, state}, user) {
      // 模拟服务器异步提交
      return new Promise((resolve, reject) => {
        // 1秒后提交成功
        setTimeout(() => {
          commit('userAdd', user)
          resolve(user)
        }, 1000)
      })
    },
    userDelete({dispatch, commit, state}, userId) {
      commit('userDelete', userId)
    }
  },

  getters: {
    userList(state, getters) {
      return state.list
    }
  }
}
