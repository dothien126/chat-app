import mongoose, { Schema } from 'mongoose';

export type IMessage = {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  receiverId: string;
  read: boolean;
};

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: { type: String },
    senderId: { type: String },
    text: { type: String },
    receiverId: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
