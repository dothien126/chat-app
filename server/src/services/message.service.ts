import mongoose from 'mongoose';
import { IMessage, Message } from '../models/message.model';
import { errorUnknown, notFoundMsg } from '../utils/myVariable';

// create message
export const createMessage = async function (data: IMessage) {
  try {
    const message = new Message({
      conversationId: data.conversationId,
      senderId: data.senderId,
      text: data.text,
      receiverId: data.receiverId,
    });
    await message.save();
    return message;
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

// get all messages of conversation
export const getAllMessagesOfConversation = async (data: IMessage) => {
  try {
    const messageList = await Message.aggregate([
      {
        $match: {
          conversationId: data.conversationId,
        },
      },
    ]);
    if (messageList) {
      return messageList;
    } else {
      return notFoundMsg;
    }
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

// mark message read
export const markReadedMessage = async function (data: IMessage) {
  try {
    const messageReaded = await Message.find({
      conversationId: data.conversationId,
    }).updateMany({ read: true });

    return messageReaded;
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

// update message
export const updateMessage = async function (data: IMessage): Promise<any> {
  try {
    // init value
    let condition: any = {};
    if (data._id) condition._id = new mongoose.Types.ObjectId(data._id);

    // check message if exist will update
    const message = await Message.findOne(condition);
    if (message) {
      message.conversationId = message.conversationId;
      message.text = data.text ? data.text : message.text;
      await message.save();

      return message;
    } else {
      return notFoundMsg;
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

// delete message
export const deleteMessage = async function (data: IMessage): Promise<any> {
  try {
    // init value
    let condition: any = {};
    if (data._id) condition._id = new mongoose.Types.ObjectId(data._id);

    // check user if exist will delete
    const message = await Message.findOneAndDelete(condition);
    if (message) {
      return message;
    } else {
      return notFoundMsg;
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};
