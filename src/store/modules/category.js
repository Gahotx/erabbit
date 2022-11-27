// 分类模块
import { getAllCategory } from '@/api'

export default {
  namespaced: true,
  state: () => {
    return {
      list: [] // 分类列表
    }
  },
  mutations: {
    setList(state, value) {
      state.list = value
    }
  },
  actions: {
    async getAllCategoryAt({ commit }) {
      const res = await getAllCategory()
      commit('setList', res.result)
      // console.log(res)
    }
  }
}
