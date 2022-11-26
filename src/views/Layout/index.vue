<template>
  <div>
    <app-top-nav></app-top-nav>
    <app-header></app-header>
    <main>
      <router-view></router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppTopNav from '@/components/AppTopNav.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'Layout',
  components: {
    AppTopNav,
    AppHeader,
    AppFooter
  },
  setup() {}
}
</script>
<style lang="less" scoped></style>
