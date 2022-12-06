<template>
  <div class="xtx-checkout-page">
    <!-- 加载中效果 -->
    <div v-if="loading" class="container">
      <div class="loading"></div>
    </div>

    <div class="container" v-else>
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>填写订单</XtxBreadItem>
      </XtxBread>

      <div class="wrapper" v-if="info">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text" v-if="addr">
              <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
              <ul>
                <li>
                  <span>收<i />货<i />人：</span>{{ addr.receiver }}
                </li>
                <li><span>联系方式：</span>{{ addr.contact }}</li>
                <li>
                  <span>收货地址：</span>{{ addr.fullLocation + addr.address }}
                </li>
              </ul>
              <a href="javascript:;" @click="editAddr(addr)">修改地址</a>
            </div>
            <div class="action">
              <XtxButton class="btn" @click="changeAddr()">切换地址</XtxButton>
              <XtxButton class="btn" @click="editAddr()">添加地址</XtxButton>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in info.goods" :key="item.id">
                <td>
                  <router-link class="info" :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="" />
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </router-link>
                </td>
                <td>&yen;{{ item.price }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.totalPrice }}</td>
                <td>&yen;{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;"
            >不限送货时间：周一至周日</a
          >
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ info.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ info.summary.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ info.summary.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">
                ¥{{ info.summary.totalPayPrice.toFixed(2) }}
              </dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton type="primary" @click="submitOrderFn">提交订单</XtxButton>
        </div>
      </div>

      <!-- 地址编辑组件 -->
      <address-edit ref="dialog" @editAddrEV="editAddrFn"></address-edit>

      <!-- 选择收货地址 -->
      <XtxDialog
        title="选择收货地址"
        v-model:visible="changeAddrDialog"
        v-if="info"
      >
        <div
          class="text item"
          v-for="item in info.userAddresses"
          :key="item.id"
          :class="{ active: item.id === selectedId }"
          @click="selectedId = item.id"
        >
          <ul>
            <li>
              <span>收<i />货<i />人：</span>{{ item.receiver }}
            </li>
            <li><span>联系方式：</span>{{ item.contact }}</li>
            <li>
              <span>收货地址：</span>{{ item.fullLocation + item.address }}
            </li>
          </ul>
        </div>
        <template #footer>
          <XtxButton
            type="gray"
            style="margin-right: 20px"
            @click="changeAddrDialog = false"
          >
            取消
          </XtxButton>
          <XtxButton type="primary" @click="confirmFn"> 确认 </XtxButton>
        </template>
      </XtxDialog>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Message from 'erabbit-ui/packages/components/Message'
import { getOrderInfo, getAddress, createOrder } from '@/api'
import AddressEdit from './components/AddressEdit.vue'

export default {
  name: 'Order',
  components: {
    AddressEdit
  },
  setup() {
    const info = ref(null)
    const loading = ref(true)
    onMounted(async() => {
      const res = await getOrderInfo()
      info.value = res.result
      loading.value = false
    })
    const addr = computed(() => {
      // 有选中地址优先取
      if (confirmId.value) {
        return info.value.userAddresses.find(
          item => item.id === confirmId.value
        )
      }

      if (info.value && info.value.userAddresses) {
        const defaultAddr = info.value.userAddresses.find(
          item => item.isDefault === 0
        )
        return defaultAddr || info.value.userAddresses[0]
      }
      return null
    })
    // 添加/修改地址弹窗
    const dialog = ref(null)
    const editAddr = addr => {
      dialog.value.open(addr)
    }
    // 编辑地址事件
    const editAddrFn = async() => {
      const res = await getAddress()
      info.value.userAddresses = res.result
    }
    // 选择地址弹窗
    const changeAddrDialog = ref(false)
    const selectedId = ref(null)
    const confirmId = ref(null)
    const changeAddr = () => {
      changeAddrDialog.value = true
      selectedId.value = addr.value.id
    }
    const confirmFn = () => {
      confirmId.value = selectedId.value
      changeAddrDialog.value = false
    }
    // 提交订单
    const router = useRouter()
    const submitOrderFn = async() => {
      if (!addr.value.id) return Message({ text: '请选择收货地址' })
      try {
        const res = await createOrder({
          goods: info.value.goods.map(({ skuId, count }) => ({ skuId, count })),
          addressId: addr.value.id,
          // 以下是默认信息
          deliveryTimeType: 1,
          payType: 1,
          payChannel: 1,
          buyerMessage: ''
        })
        router.push(`/user/pay?id=${res.result.id}`)
      } catch (error) {
        Message({
          type: 'error',
          text: error.response.data.message || '提交订单失败'
        })
      }
    }

    return {
      info,
      loading,
      addr,
      dialog,
      editAddr,
      editAddrFn,
      changeAddrDialog,
      selectedId,
      confirmFn,
      changeAddr,
      submitOrderFn
    }
  }
}
</script>

<style scoped lang="less">
.loading {
  height: 600px;
  border-top: 72px solid #f5f5f5;
  background: #fff url(../../assets/load.gif) no-repeat center / 80px 80px;
}

.xtx-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: var(--xtx-color);
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: var(--xtx-color);
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: var(--price-color);
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.xtx-dialog {
  :deep(.wrapper) {
    max-height: 100%;
    overflow-y: auto;
    .body {
      font-size: 14px;
    }
  }
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: var(--xtx-color);
        background: lighten(#3eaf7c, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
        i {
          width: 0.5em;
          display: inline-block;
        }
      }
    }
  }
}
</style>
