import { apiClient } from '../http-common';
import { IConversation, GetConversationOfFriend, Conversation } from '../types/conversationType';

class ConversationService {
  // Conv === conversation
  createConv(data: Conversation) {
    return apiClient.post('/conversation/create', data);
  }

  getConvList(data: IConversation) {
    return apiClient.post('/conversation/user', data);
  }

  getConvOfFriend(data: GetConversationOfFriend) {
    return apiClient.post('/conversation/user/friend', data);
  }

  deleteConv(data: IConversation) {
    return apiClient.post('/conversation/delete', data)
  }
}

export default new ConversationService();
