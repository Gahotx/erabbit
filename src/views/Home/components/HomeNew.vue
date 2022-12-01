<template>
  <home-panel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #right><xtx-more style="line-height: 22px" /></template>
    <!-- 面板内容 -->
    <div class="home-new">
      <transition name="fade">
        <ul class="goods-list" v-if="list.length">
          <li v-for="item in list" :key="item.id">
            <router-link :to="`/product/${item.id}`">
              <img :src="item.picture" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </router-link>
          </li>
        </ul>
        <home-skeleton name="fade" bg="#f0f9f4" v-else></home-skeleton>
      </transition>
    </div>
  </home-panel>
</template>

<script>
import { getNew } from '@/api'
import { useLazyData } from '@/utils/hooks'
import HomePanel from './HomePanel.vue'
import HomeSkeleton from '@/components/HomeSkeleton.vue'

export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup() {
    const { list, target } = useLazyData(getNew)
    return { list, target }
  }
}
</script>

<style scoped lang="less">
.home-new {
  position: relative;
  height: 426px;
}
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    transition: all 0.5s;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: var(--price-color);
    }
  }
}
</style>
