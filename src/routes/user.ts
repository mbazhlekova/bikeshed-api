import { Request, Response, Router } from 'express';
import * as bcrypt from 'bcryptjs';
import { User, validateUser } from '../model/User';
import auth from '../middleware/auth';
import { RequestWithAuth } from '../types/Request';
import { NextFunction } from 'connect';

class UserRoutes {
  public static routes(): Router {
    return Router()
      .get('/current', auth, async (req: RequestWithAuth, res: Response) => {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
      })
      .post('/register', async (req: Request, res: Response, next: NextFunction) => {
        const { name, password, email } = req.body;
        const { error } = validateUser(req.body);
        if (error) {
          return res.status(400).send(error.details[0].message);
        }
        try {
          let user = await User.findOne({ email });
          if (user) {
            return res.status(400).send('User already registered.');
          }

          user = new User({
            name,
            password,
            email,
          });
          user.password = await bcrypt.hash(user.password, 10);
          await user.save();

          const token = user.generateAuthToken();
          res.header('x-auth-token', token).send({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
        } catch (error) {
          res.status(500).send('There was a problem registering user');
          next(error);
        }
      })
      .post('/login', async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).send('User with that email not found');
          } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
              res.status(401).send({ auth: false, token: null });
            }
            const token = user.generateAuthToken();
            res.send({ auth: true, token });
          }
        } catch (error) {
          res.status(500).json({ success: false, data: error });
          next(error);
        }
      });
  }
}

export default UserRoutes;
