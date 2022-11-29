import request from '@/utils/request'

/**
 * 获取-商品详情
 * @param {*} id 商品id
 * @returns
 */
export function getGoods(id) {
  return request({
    url: '/goods',
    method: 'GET',
    params: {
      id
    }
  })
}

/**
 * 同类推荐
 * @param {*} params id, limit
 * @returns
 */
export function getGoodsRelevant(params) {
  return request({
    url: '/goods/relevant',
    method: 'GET',
    params
  })
}

/**
 * 热销推荐
 * @param {*} params id, limit, type
 * @returns
 */
export function getGoodsHot(params) {
  return request({
    url: '/goods/hot',
    method: 'GET',
    params
  })
}
