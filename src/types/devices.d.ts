export interface DeviceFormData {
  deviceName: string
  deviceType: string
  status: string
  createAt: string
  productId: string
}

export interface DeviceType {
  id: number
  deviceName: string
  deviceType: string
  status: string
  createAt: string
  updateAt: string
  productId: string
}

export interface DeviceState {
  deviceList: DeviceType[]
  total: number
}

export interface DeviceQuery {
  page: number
  pageSize: number
  deviceFormData?: DeviceFormData
}
