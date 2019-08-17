import { mongoose } from '../config/db';
import { Document, Schema } from 'mongoose';

export interface IPoll extends Document {
  name: string;
  createdAt: Date;
  choices: [IChoice];
  createdBy: string;
}

interface IChoice {
  text: string;
  votes: number;
}

const schema = new Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  choices: [
    {
      text: String,
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdBy: String,
});

export const Poll = mongoose.model<IPoll>('Poll', schema);
