import { Conversation } from '../models/conversation.model';
import { errorUnknown } from '../utils/myVariable';

// create conversation
export const createConversation = async function (senderId: string, receiverId: string) {
  try {
    const conversation = new Conversation({
      members: [senderId, receiverId],
    });
    await conversation.save();
    return conversation;
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

// get conversation of user
export const getConversationOfUser = async (userId: string) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    return conversation;
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

// get conversation of 2 users
export const getConversationOfTwoUser = async (senderId: string, receiverId: string) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    return conversation;
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

// delete conversation
export const deleteConversation = async (userId: string) => {
  try {
    const result = await Conversation.findOneAndDelete({
      members: { $in: [userId] },
    });
    return result;
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
