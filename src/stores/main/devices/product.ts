import { defineStore } from 'pinia'
import { getProductList } from '@/service/main/devices/product'
import { localCache } from '@/utils/cache'
import type { ProductState } from '@/types'

const useProductStore = defineStore('product', {
  state(): ProductState {
    return {
      productList: localCache.getCache('productList') || [],
      total: localCache.getCache('productTotal') || 0
    }
  },
  actions: {
    async getProductListAction() {
      const productListResult = await getProductList()
      this.productList = productListResult.data.products
      this.total = productListResult.data.total
    }
  }
})

export default useProductStore
