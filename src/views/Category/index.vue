<template>
  <div class="xtx-category-page">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <transition name="fade-right" mode="out-in">
          <xtx-bread-item :key="cname">{{ cname }}</xtx-bread-item>
        </transition>
      </xtx-bread>

      <!-- 轮播图 -->
      <xtx-carousel :sliders="sliders" style="height: 500px" autoPlay />

      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in secList" :key="item.id">
            <router-link :to="`/category/sub/${item.id}`">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in secList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">物美价廉，品质之选</p>
          <xtx-more :to="`/category/sub/${item.id}`" />
        </div>
        <div class="body">
          <ul>
            <goods-item
              v-for="goodsObj in item.goods"
              :key="goodsObj.id"
              :goods="goodsObj"
            ></goods-item>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getBanner, getSecCategory } from '@/api'
import GoodsItem from '@/components/GoodsItem.vue'

export default {
  name: 'Category',
  components: {
    GoodsItem
  },
  setup() {
    // 获取轮播图数据
    const sliders = ref([])

    onMounted(() => {
      getBannerFn()
    })

    const getBannerFn = async() => {
      const res = await getBanner({
        distributionSite: 2
      })
      sliders.value = res.result
    }

    // 获取二级分类商品数据
    const route = useRoute()
    const cname = ref('')
    const secList = ref([])
    const getSecCategoryFn = async id => {
      const res = await getSecCategory(id)
      cname.value = res.result.name
      secList.value = res.result.children
      // console.log(res)
    }
    getSecCategoryFn(route.params.cid)

    // 监听路由参数改变
    onBeforeRouteUpdate((to, from, next) => {
      getSecCategoryFn(to.params.cid)
      next()
    })

    return { sliders, cname, secList }
  }
}
</script>

<style lang="less" scoped>
.xtx-category-page {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: var(--xtx-color);
          }
        }
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 60px 30px;
      li {
        margin-right: 5px;
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
    .none {
      height: 220px;
      text-align: center;
      width: 100%;
      line-height: 220px;
      color: #999;
    }
  }
}
</style>
