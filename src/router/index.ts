import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/record/Record.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/About.vue'),
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/message/Message.vue'),
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('../views/article/Article.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // 路由配置
})

export default router
