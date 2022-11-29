<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">同类商品推荐</span>
    </div>
    <xtx-carousel :sliders="sliders" autoPlay></xtx-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getGoodsRelevant } from '@/api'

export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  setup() {
    const sliders = ref([])
    const route = useRoute()

    const getGoodsRelevantFn = async() => {
      const res = await getGoodsRelevant({
        id: route.params.gid,
        limit: 4
      })
      sliders.value = res.result
    }
    getGoodsRelevantFn()

    return { sliders }
  }
}
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid var(--xtx-color);
      border-right: 4px solid var(--xtx-color);
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(#27ba9b, 40%);
      }
    }
  }
}
</style>
