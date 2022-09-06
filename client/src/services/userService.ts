import { apiClient } from '../http-common';
import { IUser } from '../types/userType';

class UserService {
  login(data: IUser, authentication: string) {
    return apiClient(authentication).post('/user/login', data);
  }

  insert(user: IUser, authentication: string): Promise<any> {
    return apiClient(authentication).post('/user/insert', user);
  }

  getInforMe(authorization: string): Promise<any> {
    return apiClient(authorization).get('/user/infor');
  }

  getAllExpelMe(user: any, authorization: string): Promise<any> {
    return apiClient(authorization).post('/user/all-user-not-me', user);
  }
}

export default new UserService();
