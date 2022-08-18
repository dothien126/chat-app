import jwt from 'jsonwebtoken';

import { errorServer } from '../utils/myVariable';

export const authorizationUser = async function (authorization: string): Promise<string> {
  let userId = '';
  try {
    const secretOrKey = 'process.env.JWT_SECRET_KEY as string';
    await jwt.verify(authorization, secretOrKey, async function (err, decoded: any) {
      if (err || !decoded) {
        return errorServer;
      } else {
        userId = decoded.id;
      }
    });
  } catch (e: unknown) {
    return userId;
  }
  return userId;
};
