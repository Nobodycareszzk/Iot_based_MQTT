import myRequest from '@/service'
import type { DeviceQuery, DeviceAdd, DeviceUpdate } from '@/types'

export function getDeviceList(queryInfo: DeviceQuery) {
  return myRequest.post({
    url: '/device/query/list',
    data: queryInfo
  })
}

export function deleteDeviceByID(deviceId: number) {
  return myRequest.delete({
    url: `/device/delete/${deviceId}`
  })
}

export function createDevice(deviceAddInfo: DeviceAdd) {
  return myRequest.post({
    url: '/device/create',
    data: deviceAddInfo
  })
}

export function updateDevice(deviceUpdateInfo: DeviceUpdate) {
  return myRequest.post({
    url: '/device/update',
    data: deviceUpdateInfo
  })
}
