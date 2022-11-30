<template>
  <login-header>欢迎登录</login-header>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a href="javascript:;" :class="{ active : !isQrcode}" @click="isQrcode = false">账户登录</a>
        <a href="javascript:;" :class="{ active : isQrcode}" @click="isQrcode = true">扫码登录</a>
      </nav>
      <!-- 账户登录 -->
      <login-form v-if="!isQrcode"></login-form>

      <!-- 扫码登录 -->
      <div class="qrcode-box" v-else>
        <img src="@/assets/qrcode.jpg" alt="">
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <login-footer />
</template>

<script>
import { ref } from 'vue'
import LoginHeader from './components/LoginHeader.vue'
import LoginFooter from './components/LoginFooter.vue'
import LoginForm from './components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginFooter,
    LoginForm
  },
  setup() {
    const isQrcode = ref(false)

    return { isQrcode }
  }
}
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: var(--xtx-color);
          font-weight: bold;
        }
      }
    }
  }
}

// 二维码容器
.qrcode-box {
  text-align: center;
  padding-top: 40px;
  p {
    margin-top: 20px;
    a {
      color: var(--xtx-color);
      font-size: 16px;
    }
  }
}
</style>
