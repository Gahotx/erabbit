<template>
  <!-- 商品详情 -->
  <div class="goods-footer">
    <div class="left">
      <div class="goods-detail">
        <div class="head">商品详情</div>
        <div class="content">
          <!-- 属性 -->
          <ul class="attrs">
            <li v-for="item in goods.details.properties" :key="item.value">
              <span class="dt">{{ item.name }}</span>
              <span class="dd">{{ item.value }}</span>
            </li>
          </ul>
          <img
            v-for="(img, index) in goods.details.pictures"
            :key="index"
            :src="img"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="goods-hot">
        <h3>每日热榜</h3>
        <goods-item
          v-for="item in goods.hotByDay"
          :key="item.id"
          :goods="item"
        />

        <h3>每周热榜</h3>
        <goods-item v-for="item in hotGoods" :key="item.id" :goods="item" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getGoodsHot } from '@/api'
import GoodsItem from '@/components/GoodsItem.vue'

export default {
  name: 'GoodsFooter',
  components: {
    GoodsItem
  },
  props: {
    // 商品对象
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const route = useRoute()
    const hotGoods = ref([])
    const getGoodsHotFn = async() => {
      const res = await getGoodsHot({
        id: route.params.gid,
        limit: 16,
        type: 2
      })
      hotGoods.value = res.result
      // console.log(res)
    }
    getGoodsHotFn()

    return { hotGoods }
  }
}
</script>
<style lang="less" scoped>
.goods-footer {
  display: flex;
  margin-top: 20px;
  .left {
    width: 940px;
    margin-right: 20px;
  }
  .right {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-detail {
  background: #fff;
  .head {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    padding: 0 40px;
    border-bottom: 1px solid #f5f5f5;
  }
  .content {
    padding: 40px;
    .attrs {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;
      li {
        display: flex;
        margin-bottom: 10px;
        width: 50%;
        .dt {
          width: 100px;
          color: #999;
        }
        .dd {
          flex: 1;
          color: #666;
        }
      }
    }
    img {
      width: 100%;
    }
  }
}
.goods-hot {
  h3 {
    height: 70px;
    background: var(--help-color);
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
