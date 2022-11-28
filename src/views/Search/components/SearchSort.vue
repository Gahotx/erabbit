<template>
  <div class="search-sort">
    <div class="sort">
      <a
        href="javascript:;"
        @click="changeSort(null)"
        :class="{ active: sortParams.sortField === null }"
        >默认排序</a
      >
      <a
        href="javascript:;"
        @click="changeSort('publishTime')"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        >最新商品</a
      >
      <a
        href="javascript:;"
        @click="changeSort('orderNum')"
        :class="{ active: sortParams.sortField === 'orderNum' }"
        >最高人气</a
      >
      <a
        href="javascript:;"
        @click="changeSort('evaluateNum')"
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        >评论最多</a
      >
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i
          class="arrow up"
          :class="{ active: sortParams.sortMethod === 'asc' }"
        />
        <i
          class="arrow down"
          :class="{ active: sortParams.sortMethod === 'desc' }"
        />
      </a>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

export default {
  name: 'SearchSort',
  emits: ['changeSortEV'],
  setup(props, { emit }) {
    const sortParams = reactive({
      sortField: null, // publishTime, orderNum, price, evaluateNum
      sortMethod: null // asc为正序 desc为倒序
    })
    const changeSort = sortField => {
      if (sortField === 'price') {
        // 如果点击的是价格，多判断一个排序
        sortParams.sortField = sortField
        if (sortParams.sortMethod === null) {
          // 第一次点击，默认降序
          sortParams.sortMethod = 'asc'
        } else {
          sortParams.sortMethod =
            sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 重复点击一个按钮
        if (sortParams.sortField === sortField) return false
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }

      emit('changeSortEV', sortParams)
    }

    // 重新搜索跳转路由前，重置筛选状态
    onBeforeRouteUpdate((to, from, next) => {
      sortParams.sortField = null
      sortParams.sortMethod = null
      next()
    })

    return { sortParams, changeSort }
  }
}
</script>

<style scoped lang="less">
.search-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: var(--xtx-color);
        border-color: var(--xtx-color);
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: var(--xtx-color);
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: var(--xtx-color);
          }
        }
      }
    }
  }
}
</style>
