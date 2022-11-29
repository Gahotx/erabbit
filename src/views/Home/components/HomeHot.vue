<template>
  <home-panel ref="target" title="人气推荐" sub-title="人气推荐 不容错过">
    <!-- 面板内容 -->
    <div class="home-hot">
      <transition name="fade">
        <ul class="goods-list" v-if="list.length">
          <li v-for="item in list" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" />
              <p class="name ellipsis">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </router-link>
          </li>
        </ul>
        <home-skeleton name="fade" bg="#f0f9f4" v-else></home-skeleton>
      </transition>
    </div>
  </home-panel>
</template>
<script>
import { getHot } from '@/api'
import { useLazyData } from '@/utils/hooks'
import HomePanel from './HomePanel.vue'
import HomeSkeleton from '@/components/HomeSkeleton.vue'

export default {
  name: 'HomeHot',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup() {
    const { list, target } = useLazyData(getHot)
    return { list, target }
  }
}
</script>
<style scoped lang="less">
.home-hot {
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
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
