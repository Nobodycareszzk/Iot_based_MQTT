export interface userAccount {
  username: string
  password: string
}

export interface ChildMenuType {
  id: number
  name: string
  type: number
  url: string | null
  icon: string | null
  createAt: string
  updateAt: string
  parentId: number
}

export interface RootMenuType {
  id: number
  name: string
  type: number
  url: string | null
  icon: string
  createAt: string
  updateAt: string
  parentId: number | null
  children: ChildMenuType[]
}

export interface PermissionType {
  id: number
  name: string
  description: string | null
  createAt: string
  updateAt: string
}
