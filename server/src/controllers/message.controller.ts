import { Request, Response } from 'express';

import * as response from '../message';
import { IMessage } from '../models/message.model';
import { authorizationUser } from '../services/auth.service';
import {
  createMessage,
  deleteMessage,
  getAllMessagesOfConversation,
  markReadedMessage,
  updateMessage,
} from '../services/message.service';
import { errorUnknown, isTokenValid, jwtNotVerify } from '../utils/myVariable';

/**
 * Create Message Controller
 * @param req
 * @param res
 */
export const createMsgHandle = async function (req: Request, res: Response) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return response.err(jwtNotVerify, res);
    }

    const verify = await authorizationUser(authorization);

    if (verify) {
      const data = req.body;
      const newMessage = await createMessage(data);
      return response.ok(newMessage, res);
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
 * Get Message of Conversation Controller
 * @param req
 * @param res
 */
export const getMessageListHandle = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return response.err(jwtNotVerify, res);
    }

    const verify = await authorizationUser(authorization);

    if (verify) {
      const data = req.body;
      const messageList = await getAllMessagesOfConversation(data);
      return response.ok(messageList, res);
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
 * Mark Message Readed Controller
 * @param req
 * @param res
 */
export const markReadedMessageHandle = async function (req: Request, res: Response) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return response.err(jwtNotVerify, res);
    }

    const verify = await authorizationUser(authorization);

    if (verify) {
      const data = req.body;
      const itemService = await markReadedMessage(data);
      return response.ok(itemService, res);
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
 * Update Message Controller
 * @param req
 * @param res
 */
/**
 * Update Controller
 * @param req
 * @param res
 */
export const updateMsgHandle = async (req: Request, res: Response) => {
  try {
    // check accesstoken
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      return response.err(jwtNotVerify, res);
    }

    const verify = await authorizationUser(accessToken);
    if (verify) {
      const data = req.body as IMessage;
      const item = await updateMessage(data);
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
 * Delete Message Controller
 * @param req
 * @param res
 */
export const deleteMsgHandle = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return jwtNotVerify;
    }

    const verify = await authorizationUser(authorization);

    if (verify) {
      const data = req.body as IMessage;
      const itemService = await deleteMessage(data);
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
