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

export interface DeviceQueryForm {
  deviceName: string
  deviceType: string
  status: string
  createAt: string
  productId: string
}

export interface DeviceQuery {
  page: string
  pageSize: string
  deviceFromData?: DeviceQueryForm
}

export interface DeviceUpdateForm {
  deviceName: string
  deviceType: string
}

export interface DeviceAddForm extends DeviceUpdateForm {
  productId: number
}

export interface DeviceUpdate extends DeviceUpdateForm {
  deviceId: number
}

export interface DeviceAdd extends DeviceUpdateForm {
  productId: number
}
