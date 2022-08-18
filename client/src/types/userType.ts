export type IUser = {
  _id: string
  email: string
  avatar: string
  isAdmin: boolean
  username: string
  password: string
  createdAt: Date
}

export type User = {
  accessToken: string
  userInfor: IUser
}
