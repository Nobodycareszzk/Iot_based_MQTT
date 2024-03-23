import type { RouteRecordRaw } from 'vue-router'

export const localRoutes: RouteRecordRaw[] = [
  {
    path: '/main/user',
    component: () => import('@/views/main/users/user/User.vue')
  },
  {
    path: '/main/role',
    component: () => import('@/views/main/users/role/Role.vue')
  },
  {
    path: '/main/device',
    component: () => import('@/views/main/devices/device/Device.vue')
  },
  {
    path: '/main/group',
    component: () => import('@/views/main/devices/group/Group.vue')
  },
  {
    path: '/main/product',
    component: () => import('@/views/main/devices/product/Product.vue')
  },
  {
    path: '/main/topic',
    component: () => import('@/views/main/devices/topic/Topic.vue')
  },
  {
    path: '/main/log',
    component: () => import('@/views/main/detail/log/Log.vue')
  },
  {
    path: '/main/monitor',
    component: () => import('@/views/main/detail/monitor/Monitor.vue')
  }
]
