import mongoose, { Schema } from 'mongoose';

interface IConversation {
  _id: string;
  members: string[] | undefined;
}

const ConversationSchema = new Schema<IConversation>(
  {
    members: { type: Array },
  },
  { timestamps: true }
);

export const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);
