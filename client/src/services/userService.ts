import { apiAuthClient, apiClient } from '../http-common'
import { IUser } from '../types/userType'

class UserService {
  login(data: IUser) {
    return apiAuthClient.post('/user/login', data)
  }

  insert(data: IUser) {
    return apiClient.post('/user/insert', data)
  }
}

export default new UserService()
