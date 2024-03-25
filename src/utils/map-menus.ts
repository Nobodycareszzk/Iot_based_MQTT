import { localRoutes } from '@/router/routesList'
import type { ChildMenuType, RootMenuType } from '@/types'

// 定义一个变量用于存储第一个被匹配到的菜单(进入main页面后默认展示的菜单)
export let firstMenu: ChildMenuType | null = null

/**
 * 根据菜单获取对应的路由
 * @param userMenus 用户的菜单
 */
export function getRoutesByMenu(userMenus: RootMenuType[]) {
  // 根据菜单去匹配正确的路由（对我们的路由表进行筛选）
  const routes = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }

  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function getShowMenuByPath(path: string, userMenus: RootMenuType[]) {
  // console.log('path:', path)
  // console.log('userMenus:', JSON.parse(JSON.stringify(userMenus)))
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path?: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: RootMenuType[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.顶层菜单
        breadcrumbs.push({ name: menu.name })
        // 2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
