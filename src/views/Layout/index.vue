<template>
  <div>
    <app-top-nav></app-top-nav>
    <app-header></app-header>
    <app-header-sticky></app-header-sticky>
    <main class="app-body">
      <router-view></router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import AppTopNav from '@/components/AppTopNav.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeaderSticky from '@/components/AppHeaderSticky.vue'

export default {
  name: 'Layout',
  components: {
    AppTopNav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup() {
    const store = useStore()
    store.dispatch('category/getAllCategoryAt')
  }
}
</script>
<style lang="less" scoped></style>
