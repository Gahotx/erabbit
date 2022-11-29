import request from '@/utils/request'

/**
 * 获取-二级分类列表
 * @param {*} id 一级分类id
 * @returns
 */
export function getSecCategory(id) {
  return request({
    url: '/category',
    method: 'GET',
    params: {
      id
    }
  })
}

/**
 * 二级类目-筛选条件
 * @param {*} id 二级分类id
 * @returns
 */
export function getSubFilter(id) {
  return request({
    url: '/category/sub/filter',
    method: 'GET',
    params: {
      id
    }
  })
}
