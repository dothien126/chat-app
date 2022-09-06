import { IMessage } from './messageType';
import { IUser } from './userType';

export type Conversation = {
  lastMessage: IMessage;
  unreadMessage: IMessage[];
  userDetails: IUser[];
  _id: string;
};

export type IConversation = {
  _id: string;
  members: IUser[]
};

export type GetConversationOfFriend = {
  receiverId: string;
};
