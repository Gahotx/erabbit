// 购物车模块
import { getCart, delGoods, addGoods, updateGoods, checkAllCart } from '@/api'

export default {
  namespaced: true,
  state: () => {
    return {
      list: [] // 购物车列表
    }
  },
  mutations: {
    setCart(state, goods) {
      state.list = goods
    }
  },
  actions: {
    async addCartAct({ commit, dispatch }, goods) {
      await addGoods(goods)
      await dispatch('getCartAct')
    },
    async delCartAct(store, skuId) {
      await delGoods([skuId])
      const index = store.state.list.findIndex(item => item.skuId === skuId)
      store.state.list.splice(index, 1)
      // await store.dispatch('getCartAct')
    },
    async getCartAct({ commit }) {
      const res = await getCart()
      commit('setCart', res.result)
    },
    async updateCartAct({ dispatch }, goods) {
      await updateGoods(goods)
      await dispatch('getCartAct')
    },
    async checkAllCartAct(store, selected) {
      const ids = store.getters.validList.map(item => item.skuId)
      await checkAllCart({
        selected,
        ids
      })
      await store.dispatch('getCartAct')
    },
    async batchDelCartAct(store) {
      const ids = store.getters.selectedList.map(item => item.skuId)
      await delGoods(ids)
      await store.dispatch('getCartAct')
    },
    async updateCartSkuAct(store, { oldSkuId, newSku }) {
      const oldGoods = store.state.list.find(item => item.skuId === oldSkuId)
      await delGoods([oldSkuId])
      await store.dispatch('addCartAct', {
        skuId: newSku.skuId,
        count: oldGoods.count
      })
    }
  },
  getters: {
    // 有效商品列表
    validList(state) {
      // isEffective: 后台返回的数据字段里提示是否为有效商品 (还在的) -> 可以看接口文档
      // stock: 后台保存的商品库存大于0的
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    // 有效商品件数
    validTotal(state, getters) {
      // 累积下购物车里商品总数量
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount(state, getters) {
      // 累积下购物车里商品的总价格
      return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    },
    // 选中商品列表
    selectedList(state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount(state, getters) {
      return getters.selectedList.reduce((p, c) => p + (c.nowPrice * 100 * c.count), 0) / 100
    },
    // 是否全选
    isCheckAll(state, getters) {
      return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
    }
  }
}
