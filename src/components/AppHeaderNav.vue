<template>
  <ul class="app-header-nav">
    <li class="home"><router-link to="/">首页</router-link></li>
    <li v-for="item in $store.state.category.list" :key="item.id">
      <a href="#">{{ item.name }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppHeaderNav'
}
</script>

<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      a {
        color: var(--xtx-color);
        border-bottom: 1px solid var(--xtx-color);
      }
    }
  }
}
</style>
