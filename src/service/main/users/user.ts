import myRequest from '../../index'

export function getUserList() {
  return myRequest.get({
    url: 'user/query/list'
  })
}
