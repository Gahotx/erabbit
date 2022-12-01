<template>
  <li>
    <router-link :to="`/product/${goods.id}`" class="goods-item">
      <img :src="goods.picture" alt="" />
      <p class="name ellipsis">{{ goods.name }}</p>
      <p class="desc ellipsis">{{ goods.desc }}</p>
      <p class="price">&yen;{{ goods.price }}</p>
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    // 商品对象
    goods: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang="less">
// 二级分类商品
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  background: #fff;
  transition: all 0.5s;
  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: var(--price-color);
    font-size: 20px;
  }
}
</style>
