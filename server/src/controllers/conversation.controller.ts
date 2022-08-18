import { Request, Response } from 'express';

import { authorizationUser } from '../services/auth.service';
import {
  createConversation,
  deleteConversation,
  getConversationOfTwoUser,
  getConversationOfUser,
} from '../services/conversation.service';
import { errorMsg, errorUnknown, isTokenValid, jwtNotVerify } from '../utils/myVariable';
import * as response from '../message';

/**
 * Create Conversation Controller
 * @param req
 * @param res
 */
export const createConvHandle = async function (req: Request, res: Response) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return jwtNotVerify;
    }

    const verify = await authorizationUser(authorization);

    if (verify) {
      const { receiveId } = req.body;
      const itemService = await createConversation(verify, receiveId);
      return response.ok(itemService, res);
    } else {
      return response.err(isTokenValid, res);
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return response.err(err, res);
  }
};

/**
 * Get Conversation Controller
 * @param req
 * @param res
 */
export const getConvOfUserHandle = async function (req: Request, res: Response) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return jwtNotVerify;
    }

    const verify = await authorizationUser(authorization);

    if (verify) {
      const itemService = await getConversationOfUser(verify);
      return response.ok(itemService, res);
    } else {
      return response.err(isTokenValid, res);
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return response.err(err, res);
  }
};

/**
 * Get Conversation with Friend Controller
 * @param req
 * @param res
 */
export const getConvOfTwoUserHandle = async function (req: Request, res: Response) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return jwtNotVerify;
    }

    const verify = await authorizationUser(authorization);

    if (verify) {
      const { receiveId } = req.body;
      const itemService = await getConversationOfTwoUser(verify, receiveId);
      return response.ok(itemService, res);
    } else {
      return response.err(isTokenValid, res);
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return response.err(err, res);
  }
};

/**
 * Delete Conversation Controller
 * @param req
 * @param res
 */
export const deleteConvHandle = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return jwtNotVerify;
    }

    const verify = await authorizationUser(authorization);

    if (verify) {
      const itemService = await deleteConversation(verify);
      return response.ok(itemService, res);
    } else {
      return response.err(isTokenValid, res);
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return response.err(err, res);
  }
};
