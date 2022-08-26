import { apiAuthClient, apiClient } from '../http-common';
import { IUser, User } from '../types/userType';

class UserService {
  login(data: IUser) {
    return apiAuthClient().post('/user/login', data);
  }

  insert(user: IUser): Promise<any> {
    return apiAuthClient().post('/user/insert', user);
  }

  getInforMe(user: IUser, authorization: string): Promise<any> {
    return apiClient(authorization).post('/user/infor', user);
  }

  getAll(user: IUser, authorization: string): Promise<any> {
    return apiClient(authorization).post('/user/all-user-not-me', user);
  }
}

export default new UserService();
