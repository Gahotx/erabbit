<template>
  <div class="xtx-home-page">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <home-category />
        <!-- 轮播图 -->
        <div class="home-banner">
          <xtx-carousel :sliders="sliders" autoPlay></xtx-carousel>
        </div>
      </div>
    </div>
    <!-- 新鲜好物 -->
    <home-new></home-new>
    <!-- 人气推荐 -->
    <home-hot></home-hot>
    <!-- 热门品牌 -->
    <home-brand></home-brand>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import HomeNew from './components/HomeNew.vue'
import HomeCategory from './components/HomeCategory.vue'
import HomeHot from './components/HomeHot.vue'
import HomeBrand from './components/HomeBrand.vue'
import { getBanner } from '@/api'

export default {
  name: 'Home',
  components: {
    HomeCategory,
    HomeNew,
    HomeHot,
    HomeBrand
  },
  setup() {
    const sliders = ref([])

    onMounted(async() => {
      const res = await getBanner()
      sliders.value = res.result
      // console.log(res)
    })

    return { sliders }
  }
}
</script>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    width: 100%;
    height: 100%;
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
