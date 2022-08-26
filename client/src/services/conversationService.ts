import { apiClient } from '../http-common';
import { IConversation, GetConversationOfFriend, Conversation } from '../types/conversationType';

class ConversationService {
  // Conv === conversation
  createConv(data: Conversation, authorization: string) {
    return apiClient(authorization).post('/conversation/create', data);
  }

  getConvList(data: IConversation, authorization: string) {
    return apiClient(authorization).post('/conversation/user', data);
  }

  getConvOfFriend(data: GetConversationOfFriend, authorization: string) {
    return apiClient(authorization).post('/conversation/user/friend', data);
  }

  deleteConv(data: IConversation, authorization: string) {
    return apiClient(authorization).post('/conversation/delete', data)
  }
}

export default new ConversationService();
