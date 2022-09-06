import express from 'express';

import {
  createConvHandle,
  getConvOfUserHandle,
  getConvOfTwoUserHandle,
  deleteConvHandle,
} from '../controllers/conversation.controller';

export const conversationRoute = function (app: express.Application) {
  app.route('/api/conversation/create').post(createConvHandle);
  app.route('/api/conversation/user').post(getConvOfUserHandle);
  app.route('/api/conversation/user/friend').post(getConvOfTwoUserHandle);
  app.route('/api/conversation/delete').delete(deleteConvHandle);
};
