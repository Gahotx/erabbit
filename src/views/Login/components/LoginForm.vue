<template>
  <div class="login-form">
    <div class="toggle">
      <a href="javascript:;" @click="isMsgLogin = false" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" @click="isMsgLogin = true" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <Form :validationSchema="schema" ref="formCom">
        <template v-if="!isMsgLogin">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field
                type="text"
                name="account"
                placeholder="请输入账号"
                v-model="form.account"
              />
            </div>
            <ErrorMessage name="account" v-slot="{ message }">
              <div class="error" v-if="message">
                <i class="iconfont icon-warning" />{{ message }}
              </div>
            </ErrorMessage>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <Field
                type="password"
                name="password"
                placeholder="请输入密码"
                v-model="form.password"
              />
            </div>
            <ErrorMessage name="password" v-slot="{ message }">
              <div class="error" v-if="message">
                <i class="iconfont icon-warning" />{{ message }}
              </div>
            </ErrorMessage>
          </div>
        </template>

        <template v-else>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field
                type="text"
                name="mobile"
                placeholder="请输入手机号"
                v-model="form.mobile"
              />
            </div>
            <ErrorMessage name="mobile" v-slot="{ message }">
              <div class="error" v-if="message">
                <i class="iconfont icon-warning" />{{ message }}
              </div>
            </ErrorMessage>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <Field
                type="text"
                name="code"
                placeholder="请输入验证码"
                v-model="form.code"
              />
              <span class="code" @click="sendFn">
                {{ time > 0 ? `${time}秒后重发` : '发送验证码' }}
              </span>
            </div>
            <ErrorMessage name="code" v-slot="{ message }">
              <div class="error" v-if="message">
                <i class="iconfont icon-warning" />{{ message }}
              </div>
            </ErrorMessage>
          </div>
        </template>
        <div class="form-item">
          <div class="agree">
            <Field name="isAgree" as="xtx-checkbox" v-model="form.isAgree" />
            <span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </div>
          <ErrorMessage name="isAgree" v-slot="{ message }">
            <div class="error" v-if="message">
              <i class="iconfont icon-warning" />{{ message }}
            </div>
          </ErrorMessage>
        </div>
        <a @click="submitFn" href="javascript:;" class="btn">登录</a>
      </Form>
    </div>
    <div class="action">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useIntervalFn } from '@vueuse/core'
import Message from 'erabbit-ui/packages/components/Message'
import { login, getMsgCode, CodeLogin } from '@/api'

export default {
  name: 'LoginForm',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const isMsgLogin = ref(false)
    const form = ref({
      account: null,
      password: null,
      mobile: null,
      code: null,
      isAgree: false
    })
    // 表单校验
    const schema = {
      account(val) {
        if (!val) return '请输入用户名'
        if (!/^[a-zA-Z]\w{5,19}$/.test(val)) return '字母开头且6-20个字符'
        return true
      },
      password(val) {
        if (!val) return '请输入密码'
        if (!/^\w{6,24}$/.test(val)) return '密码是6-24个字符'
        return true
      },
      mobile(val) {
        if (!val) return '请输入手机号'
        if (!/^1[3-9]\d{9}$/.test(val)) return '手机号格式错误'
        return true
      },
      code(val) {
        if (!val) return '请输入验证码'
        if (!/^\d{6}$/.test(val)) return '验证码是6个数字'
        return true
      },
      isAgree(val) {
        if (!val) return '请勾选同意用户协议'
        return true
      }
    }
    // 重置表单
    const formCom = ref(null)
    watch(isMsgLogin, () => {
      form.value = {
        account: null,
        password: null,
        mobile: null,
        code: null,
        isAgree: false
      }
      formCom.value.resetForm()
    })

    const store = useStore()
    const router = useRouter()

    // 验证码倒计时
    const time = ref(0)
    const { pause, resume, isActive } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000)

    const sendFn = async() => {
      const valid = schema.mobile(form.value.mobile)
      if (valid === true) {
        // 防止倒计时结束前点击发送
        if (!isActive.value) {
          try {
            await getMsgCode(form.value.mobile)
            // 启动计时器
            time.value = 60
            resume()
            Message({ type: 'success', text: '发送成功' })
          } catch (error) {
            Message({ type: 'error', text: '用户不存在' })
          }
        }
      } else {
        formCom.value.setFieldError('mobile', valid)
      }
    }
    const submitFn = async() => {
      const valid = await formCom.value.validate()
      if (valid) {
        try {
          const res = ref(null)
          if (isMsgLogin.value) {
            // 验证码登录
            res.value = await CodeLogin({
              mobile: form.value.mobile,
              code: form.value.code
            })
          } else {
            // 用户名登录
            res.value = await login({
              account: form.value.account,
              password: form.value.password
            })
          }
          const { id, avatar, nickname, account, mobile, token } = res.value.result
          store.commit('user/setProfile', {
            id,
            avatar,
            nickname,
            account,
            mobile,
            token
          })
          Message({
            type: 'success',
            text: '登录成功'
          })
          router.replace('/')
        } catch (error) {
          Message({
            type: 'error',
            text: '账号或密码错误'
          })
        }
      }
    }

    return { isMsgLogin, form, schema, formCom, submitFn, sendFn, time }
  }
}
</script>

<style lang="less" scoped>
// 账号容器
.login-form {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: var(--xtx-color);
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: var(--price-color);
          }
          &.active,
          &:focus {
            border-color: var(--xtx-color);
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: var(--price-color);
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: var(--xtx-color);
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
