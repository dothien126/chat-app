import express from 'express';

import { userRoute } from './user.route';
import { conversationRoute } from './conversation.route';
import { messageRoute } from './message.route';

export const route = (app: express.Application) => {
  // Route
  userRoute(app);
  conversationRoute(app);
  messageRoute(app);
};
