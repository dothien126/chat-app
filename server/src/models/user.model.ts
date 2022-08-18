import mongoose, { Schema } from 'mongoose';

// create an interface representing a document in mongodb
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  avatar: string;
}

// create schema corresponding to document interface
const userSchema = new Schema<IUser>(
  {
    username: { type: String, minLength: 5, maxlength: 50, required: true },
    email: { type: String, minLength: 5, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String },
  },
  { timestamps: true }
);

// create a model
export const User = mongoose.model<IUser>('User', userSchema);
