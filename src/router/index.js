import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const Category = () => import('@/views/Category')
const Search = () => import('@/views/Search')
const Goods = () => import('@/views/Goods')
const SubFilter = () => import('@/views/Category/SubFilter')

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
    path: '/goods/:gid',
    component: Layout,
    children: [
      {
        path: '',
        component: Goods
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }), // 路由切换时，滚动条回到最顶端
  routes
})

export default router
