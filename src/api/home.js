import request from '@/utils/request'

/**
 * 获取-全部分类
 * @returns
 */
export function getAllCategory() {
  return request({
    url: '/home/category/head',
    method: 'GET'
  })
}

/**
 * 获取-热门品牌
 * @param {*} params limit (默认为10)
 * @returns
 */
export function getHotBrand(params) {
  return request({
    url: '/home/brand',
    method: 'GET',
    params
  })
}

/**
 * 获取-轮播图数据
 * @param {*} params distributionSite (1：首页，2：分类商品页，默认为1)
 * @returns
 */
export function getBanner(params) {
  return request({
    url: '/home/banner',
    method: 'GET',
    params
  })
}

/**
 * 获取-新鲜好物
 * @param {*} params limit (默认为4)
 * @returns
 */
export function getNew(params) {
  return request({
    url: '/home/new',
    method: 'GET',
    params
  })
}

/**
 * 获取-人气推荐
 * @returns
 */
export function getHot() {
  return request({
    url: '/home/hot',
    method: 'GET'
  })
}
