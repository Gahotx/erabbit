<template>
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <div class="container">
      <router-link class="logo" to="/" />
      <app-header-nav />
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useWindowScroll } from '@vueuse/core'
import AppHeaderNav from './AppHeaderNav.vue'

export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  setup() {
    // 检测滚动事件, 是否展示吸顶组件
    // const y = ref(0)
    // const scrollFn = () => {
    //   y.value = document.documentElement.scrollTop
    // }
    // onMounted(() => {
    //   window.addEventListener('scroll', scrollFn)
    // })
    // onUnmounted(() => {
    //   window.removeEventListener('scroll', scrollFn)
    // })
    const { y } = useWindowScroll()

    return { y }
  }
}
</script>

<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid var(--xtx-color);
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: var(--xtx-color);
      }
    }
  }
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
}
</style>
