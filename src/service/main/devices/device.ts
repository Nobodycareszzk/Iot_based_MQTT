import myRequest from '@/service'
import type { DeviceQuery } from '@/types'

export function getDeviceList(queryInfo: DeviceQuery) {
  return myRequest.post({
    url: '/device/query/list',
    data: queryInfo
  })
}
