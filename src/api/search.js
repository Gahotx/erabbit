import request from '@/utils/request'

/**
 * 获取-商品搜索结果
 * @param {*} data
 * @returns
 */
export function getSearchResult(data) {
  return request({
    url: '/search/all',
    method: 'POST',
    data
  })
}
