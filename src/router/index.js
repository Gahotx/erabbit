import store from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const Category = () => import('@/views/Category')
const Search = () => import('@/views/Search')
const Goods = () => import('@/views/Goods')
const SubFilter = () => import('@/views/Category/SubFilter')
const Login = () => import('@/views/Login')
const Cart = () => import('@/views/Cart')
const Order = () => import('@/views/Order')
const Pay = () => import('@/views/Pay')
const PayResult = () => import('@/views/Pay/PayResult')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      }
    ]
  },
  {
    path: '/category/:cid',
    component: Layout,
    children: [
      {
        path: '',
        component: Category
      }
    ]
  },
  {
    path: '/category/sub/:sid',
    component: Layout,
    children: [
      {
        path: '',
        component: SubFilter
      }
    ]
  },
  {
    path: '/search',
    component: Layout,
    children: [
      {
        path: '',
        component: Search
      }
    ]
  },
  {
    path: '/product/:gid',
    component: Layout,
    children: [
      {
        path: '',
        component: Goods
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/cart',
    component: Layout,
    children: [
      {
        path: '',
        component: Cart
      }
    ]
  },
  {
    path: '/user/order',
    component: Layout,
    children: [
      {
        path: '',
        component: Order
      }
    ]
  },
  {
    path: '/user/pay',
    component: Layout,
    children: [
      {
        path: '',
        component: Pay
      },
      {
        path: 'result',
        component: PayResult
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }), // 路由切换时，滚动条回到最顶端
  routes
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const { token } = store.state.user.profile
  // 判断是否去/user开头的路由地址, 并且没有登录则进入if
  if (to.path.startsWith('/user') && !token) {
    // 强制跳转到登录页面, 并传递未遂地址
    next({ path: '/login', query: { redirect: to.fullPath } })
  }

  // 只有遇到next()才放行
  next()
})

export default router
