import { apiClient } from '../http-common';
import { IMessage } from '../types/messageType';

class MessageService {
  /* 
    Msg === message
    Conv === conversation
    */
  createMsg(data: IMessage) {
    return apiClient.post('/message/create', data);
  }

  getMsgOfConv(data: IMessage) {
    return apiClient.post('/message/conversation', data);
  }

  markMsgReaded(data: IMessage) {
    return apiClient.post('/message/mark-readed', data);
  }

  updateMsg(data: IMessage) {
    return apiClient.put('/message/update', data);
  }

  deleteMsg(data: IMessage) {
    return apiClient.post('/message/delete', data);
  }
}

export default new MessageService();
