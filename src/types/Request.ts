import { Request } from 'express';
import { IUser } from '../model/User';

export interface RequestWithAuth extends Request {
  user: IUser;
}
