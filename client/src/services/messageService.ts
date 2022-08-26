import { apiClient } from '../http-common';
import { IMessage } from '../types/messageType';

class MessageService {
  /* 
    Msg === message
    Conv === conversation
    */
  createMsg(data: IMessage, authorization: string) {
    return apiClient(authorization).post('/message/create', data);
  }

  getMsgOfConv(data: IMessage, authorization: string) {
    return apiClient(authorization).post('/message/conversation', data);
  }

  markMsgReaded(data: IMessage, authorization: string) {
    return apiClient(authorization).post('/message/mark-readed', data);
  }

  updateMsg(data: IMessage, authorization: string) {
    return apiClient(authorization).post('/message/update', data);
  }

  deleteMsg(data: IMessage, authorization: string) {
    return apiClient(authorization).post('/message/delete', data);
  }
}

export default new MessageService();
