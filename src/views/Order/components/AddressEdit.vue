<template>
  <XtxDialog
    :title="`${form.id ? '修改' : '添加'}收货地址`"
    v-model:visible="dialogVisible"
  >
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label"><i class="red">*</i>收货人：</div>
          <div class="field">
            <input
              v-model="form.receiver"
              class="input"
              placeholder="请输入收货人"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label"><i class="red">*</i>手机号：</div>
          <div class="field">
            <input
              v-model="form.contact"
              class="input"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label"><i class="red">*</i>地区：</div>
          <div class="field">
            <XtxCity
              :fullLocation="form.fullLocation"
              @change="changeCity"
              placeholder="请选择所在地区"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label"><i class="red">*</i>详细地址：</div>
          <div class="field">
            <input
              v-model="form.address"
              class="input"
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              v-model="form.postalCode"
              class="input"
              placeholder="请输入邮政编码"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              v-model="form.addressTags"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
            />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <XtxButton
        @click="dialogVisible = false"
        type="gray"
        style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton @click="confirmFn" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref } from 'vue'
import Message from 'erabbit-ui/packages/components/Message'
import { addAddress, updateAddr } from '@/api'

export default {
  name: 'AddressEdit',
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    // 打开函数
    const open = addr => {
      form.value = { ...addr }
      dialogVisible.value = true
    }
    // 表单数据对象
    const form = ref({})
    // 选择地区
    const changeCity = ret => {
      for (const key in ret) {
        form.value[key] = ret[key]
      }
    }
    // 点击确认
    const confirmFn = async() => {
      if (form.value.id) {
        // 修改地址
        try {
          await updateAddr(form.value)
          emit('editAddrEV')
          dialogVisible.value = false
        } catch (error) {
          Message({
            type: 'error',
            text: error.response.data.message || '修改失败'
          })
        }
      } else {
        // 添加地址
        try {
          form.value.isDefault = 1 // 非默认地址
          await addAddress(form.value)
          emit('editAddrEV')
          dialogVisible.value = false
        } catch (error) {
          Message({
            type: 'error',
            text: error.response.data.message || '添加失败'
          })
        }
      }
    }

    return { dialogVisible, open, form, changeCity, confirmFn }
  }
}
</script>

<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    max-height: 100%;
    overflow-y: auto;
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.address-edit {
  .red {
    color: var(--price-color);
    position: relative;
    top: 2px;
    margin-right: 2px;
  }
  .xtx-form {
    padding: 0;
    input {
      outline: none;
      &::placeholder {
        color: #ccc;
      }
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
</style>
