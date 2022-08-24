export type IMessage = {
  _id: string;
  conversationId: string;
  isReaded: boolean;
  receiverId: string;
  senderId: string;
  text: any;
};
