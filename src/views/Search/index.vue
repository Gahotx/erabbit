<template>
  <div class="xtx-search-page">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item
          >搜索“{{ $route.query.keyword }}”的结果：</xtx-bread-item
        >
      </xtx-bread>
      <div class="wrapper">
        <!-- 筛选区 -->
        <search-sort @changeSortEV="changeSortFn"></search-sort>
        <!-- 结果区 -->
        <div class="goods_result">
          <ul>
            <goods-item
              v-for="item in goodsList"
              :key="item.id"
              :goods="item"
            ></goods-item>
          </ul>
        </div>
        <!-- 暂无结果区 -->
        <div class="none" v-if="!total">
          <img src="../../assets/none.png" alt="" />
          暂无数据
        </div>
        <!-- 分页区 -->
        <xtx-pagination
          :total="total"
          :current-page="bodyObj.page"
          :page-size="bodyObj.pageSize"
          @current-change="changePager"
        ></xtx-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import SearchSort from './components/SearchSort.vue'
import GoodsItem from '@/components/GoodsItem.vue'
import { getSearchResult } from '@/api'

export default {
  name: 'Search',
  components: {
    SearchSort,
    GoodsItem
  },
  setup() {
    const goodsList = ref([])
    const route = useRoute()
    const total = ref(0)
    const bodyObj = reactive({
      page: 1,
      pageSize: 10,
      keyword: route.query.keyword,
      sortField: null,
      sortMethod: null
    })

    const getSearchResultFn = async() => {
      const res = await getSearchResult(bodyObj)
      goodsList.value = res.result.pageData.items
      total.value = res.result.pageData.counts
    }
    getSearchResultFn()

    // 筛选后重新搜索
    const changeSortFn = params => {
      bodyObj.sortField = params.sortField
      bodyObj.sortMethod = params.sortMethod
      getSearchResultFn()
    }

    // 搜索其他物品，路由参数改变
    onBeforeRouteUpdate((to, from, next) => {
      bodyObj.keyword = to.query.keyword

      // 重置其他变量
      bodyObj.page = 1
      bodyObj.pageSize = 10
      bodyObj.sortField = null
      bodyObj.sortMethod = null

      getSearchResultFn()
      next()
    })

    // 分页
    const changePager = page => {
      bodyObj.page = page
      getSearchResultFn()
    }

    return { bodyObj, goodsList, changeSortFn, total, changePager }
  }
}
</script>

<style lang="less" scoped>
.xtx-search-page {
  .wrapper {
    background-color: #fff;
    padding: 0 25px;
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
