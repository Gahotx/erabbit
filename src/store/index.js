import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// 自定义的三个模块
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
  modules: {
    cart,
    user,
    category
  },
  plugins: [
    createPersistedState({
      key: 'erabbit-store', // 本地存储的名字
      path: ['user', 'cart'] // 指定需要存储的模块
    })
  ]
})
