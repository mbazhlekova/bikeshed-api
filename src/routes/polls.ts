import { Request, Response, Router, NextFunction } from 'express';
import { Poll } from '../model/Poll';

class PollRoutes {
  public static routes(): Router {
    return Router()
      .get('/polls', async (req: Request, res: Response, next: NextFunction) => {
        try {
          const polls = await Poll.find();
          res.send(polls);
        } catch (error) {
          res.status(500).json({ success: false, data: error });
          next(error);
        }
      })
      .get('/polls/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params;
          const poll = await Poll.findById(id);
          res.send(poll);
        } catch (error) {
          res.status(500).json({ success: false, data: error });
          next(error);
        }
      })
      .post('/polls', async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { poll } = req.body;
          await Poll.create(poll);
          res.send('Success! Poll saved');
        } catch (error) {
          res.status(500).json({ success: false, data: error });
          next(error);
        }
      })
      .put('/polls/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params;
          const { poll } = req.body;
          const newPoll = await Poll.findByIdAndUpdate(id, poll, { new: true });
          res.send(newPoll);
        } catch (error) {
          res.status(500).json({ success: false, data: error });
          next(error);
        }
      })
      .delete('/polls/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params;
          const poll = await Poll.findByIdAndDelete(id);
          res.send('Success! Poll was deleted');
        } catch (error) {
          res.status(500).json({ success: false, data: error });
          next(error);
        }
      });
  }
}

export default PollRoutes;
