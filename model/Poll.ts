import { mongoose } from '../config/db';
import { Document, Schema } from 'mongoose';
import { ValidationResult } from 'joi';
import * as Joi from '@hapi/joi';

export interface Poll extends Document {
  name: string;
  createdAt: Date;
  choices: [Choice];
  createdBy: string;
}

interface Choice {
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

export const Poll = mongoose.model<Poll>('Poll', schema);

export const validatePoll = (poll: Poll): ValidationResult<Poll> => {
  const validationSchema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    choices: Joi.array()
      .min(1)
      .items(
        Joi.object({
          text: Joi.string()
            .min(3)
            .max(50)
            .required(),
          votes: Joi.number()
            .positive()
            .required(),
        })
      ),
    createdBy: Joi.string()
      .min(3)
      .max(255)
      .required(),
  };

  return Joi.validate(poll, validationSchema);
};
