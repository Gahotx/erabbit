<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart" v-if="$store.getters['cart/validList'].length">
        <table>
          <thead>
            <tr>
              <th width="120">
                <xtx-checkbox
                  @change="checkAllFn"
                  :modelValue="$store.getters['cart/isCheckAll']"
                  >全选</xtx-checkbox
                >
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-for="item in $store.getters['cart/validList']" :key="item.id">
              <td>
                <xtx-checkbox
                  @change="$event => checkOne(item.skuId, $event)"
                  :modelValue="item.selected"
                />
              </td>
              <td>
                <div class="goods">
                  <router-link :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="" />
                  </router-link>
                  <div>
                    <router-link :to="`/product/${item.id}`">
                      <p class="name ellipsis" :title="item.name">
                        {{ item.name }}
                      </p>
                    </router-link>
                    <!-- 选择规格组件 -->
                    <cart-sku
                      @change="$event => changeSku(item.skuId, $event)"
                      :skuId="item.skuId"
                      :attrsText="item.attrsText"
                    ></cart-sku>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
                <p v-if="item.price - item.nowPrice > 0">
                  比加入时优惠
                  <span class="red">&yen;{{ item.price - item.nowPrice }}</span>
                </p>
              </td>
              <td class="tc">
                <xtx-numbox
                  :min="1"
                  :max="item.stock"
                  @change="$event => changeCount(item.skuId, $event)"
                  :modelValue="item.count"
                />
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (item.nowPrice * 100 * item.count) / 100 }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="delCartFn(item.skuId)"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 操作栏 -->
      <div class="action" v-if="$store.getters['cart/validList'].length">
        <div class="batch">
          <xtx-checkbox
            @change="checkAllFn"
            :modelValue="$store.getters['cart/isCheckAll']"
            >全选</xtx-checkbox
          >
          <a href="javascript:;" @click="batchDelCartFn">删除商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters['cart/validTotal'] }} 件商品，已选择
          {{ $store.getters['cart/selectedTotal'] }} 件，商品合计：
          <span class="red">¥{{ $store.getters['cart/selectedAmount'] }}</span>
          <xtx-button type="primary">下单结算</xtx-button>
        </div>
      </div>

      <!-- 无数据提示 -->
      <cart-none v-else></cart-none>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Message from 'erabbit-ui/packages/components/Message'
import Confirm from 'erabbit-ui/packages/components/Confirm'
import CartNone from './components/CartNone.vue'
import CartSku from './components/CartSku.vue'

export default {
  name: 'Cart',
  components: {
    CartNone,
    CartSku
  },
  setup() {
    const store = useStore()
    store.dispatch('cart/getCartAct')
    // 单选
    const checkOne = (skuId, selected) => {
      store.dispatch('cart/updateCartAct', { skuId, selected })
    }
    // 全选
    const checkAllFn = selected => {
      store.dispatch('cart/checkAllCartAct', selected)
    }
    // 删除
    const delCartFn = skuId => {
      Confirm({ text: '您确定从购物车删除该商品吗？' })
        .then(() => {
          store
            .dispatch('cart/delCartAct', skuId)
            .then(() => {
              Message({ type: 'success', text: '删除成功' })
            })
            .catch(() => {
              Message({ type: 'error', text: '删除失败' })
            })
        })
        .catch(e => {
          return false
        })
    }
    // 批量删除
    const batchDelCartFn = () => {
      Confirm({ text: '您确定从购物车删除选中的商品吗？' })
        .then(() => {
          store.dispatch('cart/batchDelCartAct').then(() => {
            Message({ type: 'success', text: '删除成功' })
          })
        })
        .catch(e => {
          return false
        })
    }
    // 修改数量
    const changeCount = (skuId, count) => {
      store.dispatch('cart/updateCartAct', { skuId, count })
    }
    // 修改规格
    const changeSku = (oldSkuId, newSku) => {
      store.dispatch('cart/updateCartSkuAct', { oldSkuId, newSku })
    }

    return {
      checkOne,
      checkAllFn,
      delCartFn,
      batchDelCartFn,
      changeCount,
      changeSku
    }
  }
}
</script>

<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: var(--price-color);
}
.green {
  color: var(--xtx-color);
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
  .name:hover {
    color: var(--xtx-color);
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
