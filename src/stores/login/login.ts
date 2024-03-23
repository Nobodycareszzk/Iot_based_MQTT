import { defineStore } from 'pinia'
import { userLoginByAccount, getUserMenus, getUserPermission } from '@/service/login/login'
import type { userAccount, RootMenuType, PermissionType } from '@/types'
import router from '@/router'
import { getRoutesByMenu } from '@/utils/map-menus'

import { localCache } from '@/utils/cache'

interface IUserInfo {
  id: number
  name: string
  menu: RootMenuType[]
  permission: PermissionType[]
}

interface ILoginState {
  userInfo: IUserInfo
  accessToken: string
  refreshToken: string
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    userInfo: { id: -1, name: '', menu: [], permission: [] },
    accessToken: '',
    refreshToken: ''
  }),
  actions: {
    async accountLoginAction(account: userAccount) {
      const loginResult = await userLoginByAccount(account)

      const { id, name, accessToken, refreshToken } = loginResult.data
      this.userInfo.id = id
      this.userInfo.name = name
      this.accessToken = accessToken
      this.refreshToken = refreshToken

      const menuResult = await getUserMenus(id)

      // 由于后端返回的数据中url是不带/main的，所以需要在这里进行处理以便与路由匹配
      const modifiedMenuResult = menuResult.data.menu.map((item) => {
        if (item.children && item.children.length > 0) {
          item.children = item.children.map((child) => {
            return {
              ...child,
              url: child.url ? `/main${child.url}` : null
            }
          })
        }
        return item
      })

      this.userInfo.menu = modifiedMenuResult
      console.log('modifiedMenuResult:', modifiedMenuResult)
      console.log('store/menuResult:', menuResult)
      const permissionResult = await getUserPermission(id)
      this.userInfo.permission = permissionResult.data.permissions
      // 本地缓存
      localCache.setCache('accessToken', this.accessToken)
      localCache.setCache('refreshToken', this.refreshToken)
      localCache.setCache('userInfo', this.userInfo)

      // 动态添加路由
      const userRoutes = getRoutesByMenu(this.userInfo.menu)
      userRoutes.forEach((route) => {
        router.addRoute('main', route)
      })

      router.push('/main')
    },

    // 用户进行刷新默认加载操作
    loadLocalCacheAction() {
      const accessToken = localCache.getCache('accessToken')
      const userInfo = localCache.getCache('userInfo')
      const refreshToken = localCache.getCache('refreshToken')
      if (accessToken && userInfo && refreshToken) {
        this.accessToken = accessToken
        this.userInfo = userInfo
        this.refreshToken = refreshToken
      }
      // 动态添加路由
      const userRoutes = getRoutesByMenu(this.userInfo.menu)
      userRoutes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  }
})

export default useLoginStore
