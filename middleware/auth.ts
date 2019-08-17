import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { RequestWithAuth } from '../types/Request';
import { User } from '../model/User';

export default (req: RequestWithAuth, res: Response, next: NextFunction) => {
  const token = (req.headers['x-access-token'] as string) || req.headers[`authorization`];
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded as User;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};
