import { defineStore } from 'pinia'
import type { DeviceState, DeviceQuery, DeviceUpdate, DeviceAdd } from '@/types'
import {
  getDeviceList,
  deleteDeviceByID,
  createDevice,
  updateDevice
} from '@/service/main/devices/device'

const useDeviceStore = defineStore('device', {
  state: (): DeviceState => ({
    deviceList: [],
    total: 0
  }),
  actions: {
    async postDeviceListAction(queryInfo: DeviceQuery) {
      const res = await getDeviceList(queryInfo)
      console.log('deviceList:', res)
      this.deviceList = res.data.devices
      this.total = res.data.total
    },

    async deleteDeviceAction(id: number) {
      const deleteResult = await deleteDeviceByID(id)
      console.log('deleteResult:', deleteResult)
      // 重新发送网络请求
      this.postDeviceListAction({ page: '1', pageSize: '10' })
    },

    async createDeviceAction(deviceAddInfo: DeviceAdd) {
      const createResult = await createDevice(deviceAddInfo)
      console.log('createResult:', createResult)
      this.postDeviceListAction({ page: '1', pageSize: '10' })
    },

    async updateDeviceAction(deviceUpdateInfo: DeviceUpdate) {
      const updateResult = await updateDevice(deviceUpdateInfo)
      console.log('updateResult:', updateResult)
      this.postDeviceListAction({ page: '1', pageSize: '10' })
    }
  }
})

export default useDeviceStore
