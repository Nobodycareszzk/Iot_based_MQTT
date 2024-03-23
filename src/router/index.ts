import { createRouter, createWebHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/MainView.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
// 例如: / => /main
// to: /main from: / 返回值: /abc （跳转到abc）

router.beforeEach((to) => {
  if (to.path === '/main') {
    // 判断是否有accessToken
    if (localCache.getCache('accessToken')) {
      return firstMenu.url
    } else {
      return '/login'
    }
  }
})

export default router
