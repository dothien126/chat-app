import express from 'express';

import {
  createConvHandle,
  getConvOfUserHandle,
  getConvOfTwoUserHandle,
  deleteConvHandle,
} from '../controllers/conversation.controller';

export const conversationRoute = function (app: express.Application) {
  app.route('/api/conversation/create').post(createConvHandle);
  app.route('/api/conversation/user').get(getConvOfUserHandle);
  app.route('/api/conversation/user/friend').get(getConvOfTwoUserHandle);
  app.route('/api/conversation/delete').delete(deleteConvHandle);
};
