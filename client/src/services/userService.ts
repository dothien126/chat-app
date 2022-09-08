import { apiClient } from '../http-common';
import { IUser } from '../types/userType';

class UserService {
  login(data: IUser, authentication: string) {
    return apiClient(authentication).post('/api/user/login', data);
  }

  insert(user: IUser, authentication: string): Promise<any> {
    return apiClient(authentication).post('/api/user/insert', user);
  }

  getInforMe(authorization: string): Promise<any> {
    return apiClient(authorization).get('/api/user/infor');
  }

  getAllExpelMe(user: any, authorization: string): Promise<any> {
    return apiClient(authorization).post('/api/user/all-user-not-me', user);
  }
}

export default new UserService();
