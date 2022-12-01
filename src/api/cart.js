import request from '@/utils/request'

/**
 * 获取-购物车列表
 * @returns
 */
export function getCart() {
  return request({
    url: '/member/cart',
    method: 'GET'
  })
}

/**
 * 添加-购物车商品
 * @param {*} data
 * @returns
 */
export function addGoods(data) {
  return request({
    url: '/member/cart',
    method: 'POST',
    data
  })
}

/**
 * 删除-购物车商品
 * @param {*} data ids: 商品sku的id集合
 * @returns
 */
export function delGoods(ids) {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

/**
 * 修改-购物车商品
 * @param {*} skuId
 * @returns
 */
export function updateGoods(data) {
  return request({
    url: `/member/cart/${data.skuId}`,
    method: 'PUT',
    data
  })
}

/**
 * 修改-购物车全选/反选
 * @param {*} data selected, ids
 * @returns
 */
export function checkAllCart(data) {
  return request({
    url: '/member/cart/selected',
    method: 'PUT',
    data
  })
}

/**
 * 获取-商品信息的sku
 * @param {*} skuId
 * @returns
 */
export function getGoodsSku(skuId) {
  return request({
    url: `/goods/sku/${skuId}`,
    method: 'GET'
  })
}
