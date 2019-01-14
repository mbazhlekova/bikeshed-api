import { mongoose } from '../config/db';
import { Document, Model, Schema } from 'mongoose';

export interface IPoll extends Document {
  name: string;
  created: Date;
  choices: [IChoice];
}

interface IChoice {
  text: string;
  votes: number;
}

const schema = new Schema({
  name: String,
  created: {
    type: Date,
    default: Date.now,
  },
  choices: [
    {
      text: String,
      votes: Number,
    },
  ],
});

export const Poll = mongoose.model<IPoll>('Poll', schema);
