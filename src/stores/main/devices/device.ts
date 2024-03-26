import { defineStore } from 'pinia'
import type { DeviceState, DeviceQuery } from '@/types'
import { getDeviceList } from '@/service/main/devices/device'

const useDeviceStore = defineStore('device', {
  state: (): DeviceState => ({
    deviceList: [],
    total: 0
  }),
  actions: {
    async postDeviceListAction(queryInfo: DeviceQuery) {
      const res = await getDeviceList(queryInfo)
      this.deviceList = res.data
      this.total = res.total
    }
  }
})

export default useDeviceStore
