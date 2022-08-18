import express from 'express';
import { deleteHandle, insertHandle, loginHandle, updateHandle } from '../controllers/user.controller';

export const userRoute = function (app: express.Application) {
  app.route('/api/user/insert').post(insertHandle);
  app.route('/api/user/login').post(loginHandle);
  app.route('/api/user/update').put(updateHandle);
  app.route('/api/user/delete').delete(deleteHandle);
};
