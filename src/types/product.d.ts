export interface ProductType {
  id: number
  productName: string
  createAt: string
  updateAt: string
}

export interface ProductState {
  productList: ProductType[]
  total: number
}
