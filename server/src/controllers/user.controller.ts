import { Request, Response } from 'express';

import {
  createUser,
  findUser,
  getAllUserExpelMe,
  updateUser,
  deleteUser,
  login,
} from '../services/user.service';
import { authorizationUser } from '../services/auth.service';
import { errorUnknown, isDataValid, isTokenValid, jwtNotVerify } from '../utils/myVariable';
import { IUser } from '../models/user.model';
import * as response from '../message';

/**
 * Insert Controller
 * @param req
 * @param res
 */
export const insertHandle = async (req: Request, res: Response) => {
  try {
    // get data in body request
    const data = req.body as IUser;
    if (!data.username || !data.email || !data.password) {
      return response.err(isDataValid, res);
    }

    // insert user
    const user = await createUser(data);
    return response.ok(user, res);
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return response.err(err, res);
  }
};

/**
 * Update Controller
 * @param req
 * @param res
 */
export const updateHandle = async (req: Request, res: Response) => {
  try {
    // check accesstoken
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      return response.err(jwtNotVerify, res);
    }

    const verify = await authorizationUser(accessToken);
    if (verify) {
      const data = req.body as IUser;
      const item = await updateUser(data);
      return response.ok(item, res);
    } else {
      return response.err(isTokenValid, res);
    }
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return response.err(err, res);
  }
};

/**
 * Delete Controller
 * @param req
 * @param res
 */
export const deleteHandle = async (req: Request, res: Response) => {
  try {
    // check accesstoken
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      return response.err(jwtNotVerify, res);
    }

    const verify = await authorizationUser(accessToken);

    if (verify) {
      const data = req.body as IUser;
      const item = await deleteUser(data);
      return response.ok(item, res);
    } else {
      return response.err(isTokenValid, res);
    }
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return response.err(err, res);
  }
};

/**
 * Login Controller
 * @param req
 * @param res
 */
export const loginHandle = async function (req: Request, res: Response) {
  try {
    const data = req.body as IUser;
    if (!data.email || !data.password) {
      return isDataValid;
    }

    const item = await login(data);
    return response.ok(item, res);
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return response.err(err, res);
  }
};
