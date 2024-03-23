import myRequest from '..'
import type { userAccount } from '@/types'

export function userLoginByAccount(account: userAccount) {
  return myRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserMenus(id: number) {
  return myRequest.get({
    url: `/menu/${id}`
  })
}

export function getUserPermission(id: number) {
  return myRequest.get({
    url: `/permission/${id}`
  })
}
