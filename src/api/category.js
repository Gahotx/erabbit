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
