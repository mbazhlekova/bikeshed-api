import { Request, Response, Router, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { User } from '../model/User';

class UserRoutes {
  public static routes(): Router {
    return Router().post('/register', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: 86400,
        });
        res.status(200).send({ auth: true, token });
      } catch (error) {
        res.status(500).send('There was a problem registering the user');
      }
    });
  }
}

export default UserRoutes;
