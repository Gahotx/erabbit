<template>
  <div class="xtx-goods-page">
    <!-- 加载中效果 -->
    <div v-if="loading" class="container">
      <div class="loading"></div>
    </div>
    <!-- 商品详情数据 -->
    <div v-else class="container">
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item :to="`/category/${goodsList.categories[1].id}`">
          {{ goodsList.categories[1].name }}
        </xtx-bread-item>
        <xtx-bread-item :to="`/category/sub/${goodsList.categories[0].id}`">
          {{ goodsList.categories[0].name }}
        </xtx-bread-item>
        <xtx-bread-item>{{ goodsList.name }}</xtx-bread-item>
      </xtx-bread>

      <!-- 商品信息 -->
      <div class="goods-wrapper">
        <div class="media">
          <xtx-image-view :images="goodsList.mainPictures"></xtx-image-view>
          <goods-sales></goods-sales>
        </div>
        <div class="spec">
          <goods-info :goods="goodsList"></goods-info>

          <!-- sku组件 -->
          <xtx-sku :goods="goodsList" @change="changeSkuFn"></xtx-sku>

          <!-- 数量 -->
          <xtx-numbox :min="1" v-model="count" label="数量" />

          <!-- 按钮 -->
          <xtx-button
            type="primary"
            style="margin-top: 20px"
            @click="addGoodsCart"
          >
            加入购物车
          </xtx-button>
        </div>
      </div>

      <!-- 同类商品推荐 -->
      <goods-relevant></goods-relevant>

      <!-- 商品底部信息 -->
      <goods-footer :goods="goodsList"></goods-footer>

      <!-- 注意事项 -->
      <goods-warn></goods-warn>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import Message from 'erabbit-ui/packages/components/Message'
import { getGoods } from '@/api'
import GoodsSales from './components/GoodsSales.vue'
import GoodsInfo from './components/GoodsInfo.vue'
import GoodsFooter from './components/GoodsFooter.vue'
import GoodsWarn from './components/GoodsWarn.vue'
import GoodsRelevant from './components/GoodsRelevant.vue'

export default {
  name: 'Goods',
  components: {
    GoodsSales,
    GoodsInfo,
    GoodsFooter,
    GoodsRelevant,
    GoodsWarn
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const goodsList = ref(null) // 商品信息
    const loading = ref(true)
    const currSku = ref(null)
    const count = ref(1)

    const getGoodsFn = async gid => {
      const res = await getGoods(gid)
      goodsList.value = res.result
      loading.value = false
    }
    getGoodsFn(route.params.gid)

    const changeSkuFn = sku => {
      if (sku) {
        goodsList.value.price = sku.price
        goodsList.value.oldPrice = sku.oldPrice
        goodsList.value.inventory = sku.inventory
        currSku.value = sku
      } else {
        currSku.value = null
      }
    }

    const addGoodsCart = () => {
      // 先判断商品规格是否选择完整
      if (!currSku.value || Object.keys(currSku.value).length === 0) {
        return Message({ text: '请选择商品规格' })
      } else if (count.value > goodsList.value.inventory) {
        return Message({ text: '库存不足' })
      } else {
        // 判断用户是否登录
        if (store.state.user.profile.token) {
          // 已登录
          store.dispatch('cart/addCartAct', {
            id: goodsList.value.id,
            skuId: currSku.value.skuId,
            name: goodsList.value.name,
            picture: goodsList.value.mainPictures[0],
            price: currSku.value.price,
            nowPrice: currSku.value.price,
            count: count.value,
            attrsText: currSku.value.specsText,
            selected: true,
            isEffective: true,
            stock: currSku.value.inventory
          }).then(() => {
            Message({ text: '加入购物车成功', type: 'success' })
          }).catch(() => {
            Message({ type: 'error', text: '加入购物车失败' })
          })
        } else {
          // 未登录
          router.push(
            `/login?redirect=${encodeURIComponent(
              router.currentRoute.value.fullPath
            )}`
          )
          return Message({ text: '请登录后再操作' })
        }
      }
    }

    onBeforeRouteUpdate((to, from, next) => {
      count.value = 1
      goodsList.value = null
      currSku.value = null
      loading.value = true
      getGoodsFn(to.params.gid)
      next()
    })

    return { goodsList, loading, changeSkuFn, count, addGoodsCart }
  }
}
</script>

<style lang="less" scoped>
.loading {
  height: 600px;
  border-top: 72px solid #f5f5f5;
  background: #fff url(../../assets/load.gif) no-repeat center / 80px 80px;
}
.goods-wrapper {
  display: flex;
  background: #fff;
  min-height: 600px;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
