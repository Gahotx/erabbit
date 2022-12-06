import request from '@/utils/request'

/**
 * 生成-订单(结算页)
 * @returns
 */
export function getOrderInfo() {
  return request({
    url: '/member/order/pre',
    method: 'GET'
  })
}

/**
 * 添加收货地址
 * @param {*} data
 * @returns
 */
export function addAddress(data) {
  return request({
    url: '/member/address',
    method: 'post',
    data
  })
}

/**
 * 查询收货地址
 * @returns
 */
export function getAddress() {
  return request({
    url: '/member/address'
  })
}

/**
 * 修改-收货地址
 * @param {*} data
 * @returns
 */
export function updateAddr(data) {
  return request({
    url: `/member/address/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 提交-订单
 * @param {*} data
 * @returns
 */
export function createOrder(data) {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}
