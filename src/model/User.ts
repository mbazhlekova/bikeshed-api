import { mongoose } from '../config/db';
import { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const schema = new Schema({
  username: String,
  email: String,
  password: String,
});

export const User = mongoose.model<IUser>('User', schema);
