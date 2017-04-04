import _ from 'lodash'
import types from '../types/user'

export default {
  state: {
    list: []
  },

  mutations: {
    [types.USER_ADD](state, user) {
      state.list.unshift(user)
    },
    [types.USER_DELETE](state, userId) {
      let index = state.list.findIndex((item, idx) => item.id == userId)
      state.list.splice(index, 1)
    },
    [types.USER_SHUFFLE](state) {
      state.list = _.shuffle(state.list)
    }
  },

  actions: {
    [types.USER_ADD]({dispatch, commit, state}, user) {
      // 模拟服务器异步提交
      return new Promise((resolve, reject) => {
        // 1秒后提交成功
        setTimeout(() => {
          commit(types.USER_ADD, user)
          resolve(user)
        }, 1000)
      })
    },
    [types.USER_DELETE]({dispatch, commit, state}, userId) {
      commit(types.USER_DELETE, userId)
    }
  },

  getters: {
    [types.USER_LIST](state, getters) {
      return state.list
    }
  }
}
