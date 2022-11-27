<template>
  <div class="home-category">
    <template v-if="categoryList.length">
      <ul class="menu">
        <li v-for="item in categoryList" :key="item.name">
          <router-link to="/">{{ item.name }}</router-link>
          <a href="javascript:;" v-for="obj in item.children" :key="obj.id">{{ obj.name }}</a>
          <!-- 弹层 -->
          <div class="layer">
            <h4>{{ item.goods ? '分类' : '品牌' }}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
            <!-- 循环普通商品 -->
            <ul v-if="item.goods">
              <li v-for="obj in item.goods" :key="obj.id">
                <router-link to="/">
                  <img :src="obj.picture" :alt="obj.desc" />
                  <div class="info">
                    <p class="name ellipsis-2">{{ obj.name }}</p>
                    <p class="desc ellipsis">{{ obj.desc }}</p>
                    <p class="price"><i>¥</i>{{ obj.price }}</p>
                  </div>
                </router-link>
              </li>
            </ul>
            <!-- 循环品牌商品 -->
            <ul v-else>
              <li class="brand" v-for="obj in item.brands" :key="obj.id">
                <router-link to="/">
                  <img :src="obj.picture" alt="" />
                  <div class="info">
                    <p class="place"><i class="iconfont icon-dingwei"></i>{{ obj.place }}</p>
                    <p class="name ellipsis">{{ obj.name }}</p>
                    <p class="desc ellipsis-2">{{ obj.desc }}</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </template>

    <template v-else>
      <!-- 结构要和真实数据一致(所以是10行) -->
      <ul class="menu">
        <li v-for="i in 10" :key="i">
          <xtx-skeleton width="40px" height="18px" bg="rgba(255,255,255,0.2)" />
          <xtx-skeleton width="70px" height="18px" bg="rgba(255,255,255,0.2)" />
          <xtx-skeleton width="70px" height="18px" bg="rgba(255,255,255,0.2)" />
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { getHotBrand } from '@/api'

export default {
  name: 'HomeCategory',
  setup() {
    const store = useStore()
    // 品牌数据
    const hotBrand = reactive({
      name: '品牌',
      children: [{ name: '品牌推荐' }],
      brands: []
    })
    onMounted(async() => {
      const res = await getHotBrand({
        limit: 6
      })
      // console.log(res)
      hotBrand.brands = res.result
    })

    // 商品数据
    const categoryList = computed(() => {
      const list = store.state.category.list.map(item => ({
        id: item.id,
        name: item.name,
        goods: item.goods,
        children: item.children.slice(0, 2)
      }))
      // 不能在外面push，否则vuex数据更新，computed重新执行会覆盖掉
      list.push(hotBrand)
      return list
    })

    return { categoryList }
  }
}
</script>

<style scoped lang="less">
.xtx-skeleton {
  animation: fade 1.5s linear infinite alternate;
  margin-right: 6px;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    // 分类下属商品用
    > li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: var(--xtx-color);
      }
      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;
        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;
          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            &:nth-child(3n) {
              margin-right: 0;
            }
            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;
              &:hover {
                background: #e3f9f4;
              }
              img {
                width: 95px;
                height: 95px;
              }
              .info {
                padding-left: 10px;
                line-height: 24px;
                width: 190px;
                .name {
                  font-size: 16px;
                  color: #666;
                }
                .desc {
                  color: #999;
                }
                .price {
                  font-size: 22px;
                  color: var(--price-color);
                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
          // 热门品牌推荐用
          .brand {
            height: 180px;
            a {
              align-items: flex-start;
              img {
                width: 120px;
                height: 160px;
              }
              .info {
                p {
                  margin-top: 8px;
                }
                .place {
                  color: #999;
                }
              }
            }
          }
        }
      }
      &:hover {
        .layer {
          display: block;
        }
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
