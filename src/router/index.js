import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const Category = () => import('@/views/Category')
const Search = () => import('@/views/Search')

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
    path: '/search',
    component: Layout,
    children: [
      {
        path: '',
        component: Search
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
