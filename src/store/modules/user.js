// 用户模块
export default {
  namespaced: true,
  state: () => {
    return {
      // 用户信息
      profile: {
        id: null,
        avatar: null,
        nickname: null,
        account: null,
        mobile: null,
        token: null
      }
    }
  },
  mutations: {
    setProfile(state, value) {
      state.profile = value
    }
  }
}
