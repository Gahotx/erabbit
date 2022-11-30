import request from '@/utils/request'

/**
 * 登录-用户名密码
 * @param {*} data account, password
 * @returns
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

/**
 * 获取-短信验证码
 * @param {*} mobile
 * @returns
 */
export function getMsgCode(mobile) {
  return request({
    url: '/login/code',
    method: 'GET',
    params: {
      mobile
    }
  })
}

/**
 * 登录-手机验证码
 * @param {*} data mobile, code
 * @returns
 */
export function CodeLogin(data) {
  return request({
    url: '/login/code',
    method: 'POST',
    data
  })
}
