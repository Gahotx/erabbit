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
        <xtx-bread-item :to="`/category/${categoryList.parentId}`">
          {{ categoryList.parentName }}
        </xtx-bread-item>
        <xtx-bread-item>
          {{ categoryList.name }}
        </xtx-bread-item>
      </xtx-bread>

      <!-- 筛选区 -->
      <div class="sub-filter">
        <div class="item">
          <div class="head">品牌：</div>
          <div class="body">
            <a href="javascript:;" class="active">全部</a>
            <a href="javascript:;" v-for="item in categoryList.brands" :key="item.id">{{ item.name }}</a>
          </div>
        </div>
        <div
          class="item"
          v-for="item in categoryList.saleProperties"
          :key="item.id"
        >
          <div class="head">{{ item.name }}</div>
          <div class="body">
            <a href="javascript:;" class="active">全部</a>
            <a
              href="javascript:;"
              v-for="attr in item.properties"
              :key="attr.id"
              >{{ attr.name }}</a
            >
          </div>
        </div>
      </div>

      <!-- 商品列表 -->
      <div class="wrapper">
        <!-- 结果区 -->
        <div class="goods_result" v-if="categoryList.goods">
          <ul>
            <goods-item
              v-for="item in categoryList.goods"
              :key="item.id"
              :goods="item"
            ></goods-item>
          </ul>
        </div>
        <!-- 暂无结果区 -->
        <div class="none" v-else>
          <img src="../../assets/none.png" alt="" />
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getSubFilter } from '@/api'
import GoodsItem from '@/components/GoodsItem.vue'

export default {
  name: 'SubFilter',
  components: { GoodsItem },
  setup() {
    const loading = ref(true)
    const route = useRoute()
    const categoryList = ref(null)
    const getSubFilterFn = async(id) => {
      const res = await getSubFilter(id)
      categoryList.value = res.result
      loading.value = false
    }
    getSubFilterFn(route.params.sid)

    // 切换子分类
    onBeforeRouteUpdate((to, from, next) => {
      getSubFilterFn(to.params.sid)
      next()
    })

    return { loading, categoryList }
  }
}
</script>

<style lang="less" scoped>
.loading {
  height: 600px;
  border-top: 72px solid #f5f5f5;
  background: #fff url(../../assets/load.gif) no-repeat center / 80px 80px;
}

// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: var(--xtx-color);
        }
      }
    }
  }
}

.wrapper {
  background-color: #fff;
  padding: 30px 15px;
  margin-top: 25px;
  margin-bottom: 5px;
  padding-bottom: 5px;
  .goods_result {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 0 5px;
      li {
        margin-right: 20px;
        margin-bottom: 20px;
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
}

// 暂无数据标签样式
.none {
  padding: 100px 0;
  text-align: center;
  color: #999;
  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    object-fit: contain;
  }
}
</style>
