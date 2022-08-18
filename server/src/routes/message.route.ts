import express from 'express';
import {
  createMsgHandle,
  deleteMsgHandle,
  updateMsgHandle,
  getMessageListHandle,
  markReadedMessageHandle,
} from '../controllers/message.controller';

export const messageRoute = function (app: express.Application) {
  app.route('/api/message/create').post(createMsgHandle);
  app.route('/api/message/coversation').get(getMessageListHandle);
  app.route('/api/message/mark-readed').post(markReadedMessageHandle);
  app.route('/api/message/update').put(updateMsgHandle);
  app.route('/api/message/delete').delete(deleteMsgHandle);
};
