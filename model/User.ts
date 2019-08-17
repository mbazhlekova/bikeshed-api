import { mongoose } from '../config/db';
import { Document, Schema, Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { ValidationResult } from 'joi';
import * as Joi from '@hapi/joi';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

interface UserModel extends User {
  generateAuthToken(): string;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
});

schema.methods.generateAuthToken = function(): string {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET, {
    expiresIn: 86400,
  });
  return token;
};

export const User: Model<UserModel> = mongoose.model<UserModel>('User', schema);

export const validateUser = (user: User): ValidationResult<User> => {
  const validationSchema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
  };

  return Joi.validate(user, validationSchema);
};
