import request from '@/utils/request'

/**
 * 获取-订单详情(以及支付结果)
 * @param {*} id 订单id
 * @returns
 */
export function getPayInfo(id) {
  return request({
    url: `/member/order/${id}`
  })
}
