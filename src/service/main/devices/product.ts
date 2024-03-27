import myRequest from '@/service'

export function getProductList() {
  return myRequest.get({
    url: '/product/query/list'
  })
}
