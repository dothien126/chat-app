import { apiClient } from '../http-common';
import { IConversation, GetConversationOfFriend } from '../types/conversationType';

class ConversationService {
  // Conv === conversation
  createConv(data: string, authorization: string) {
    return apiClient(authorization).post('/api/conversation/create', data);
  }

  getConvList(data: any, authorization: string) {
    return apiClient(authorization).post('/api/conversation/user', data);
  }

  getConvOfFriend(data: GetConversationOfFriend, authorization: string) {
    return apiClient(authorization).post('/api/conversation/user/friend', data);
  }

  deleteConv(data: IConversation, authorization: string) {
    return apiClient(authorization).post('/api/conversation/delete', data)
  }
}

export default new ConversationService();
