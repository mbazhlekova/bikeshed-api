import * as express from 'express';
import { getRepository, Repository } from 'typeorm';
import Poll from '../entity/Poll';

class Routes {
  public express;

  constructor() {
    this.express = express();
  }

  public async getPolls(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const pollRepo: Repository<Poll> = getRepository(Poll);
    try {
      const polls = await pollRepo.find();
      res.send(polls);
    } catch (error) {
      res.status(500).json({ success: false, data: error });
      next(error);
    }
  }
}

export default Routes;
