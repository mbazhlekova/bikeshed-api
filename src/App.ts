import * as express from 'express';
import * as bodyParser from 'body-parser';
import PollRoutes from './routes/poll';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.mountRoutes();
  }

  private mountRoutes = async () => {
    this.app.use(
      (
        err: Error & { status: number },
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
      ): void => {
        response.status(err.status || 500);
        response.json({
          error: 'Server error',
        });
      }
    );

    this.app.use('/api', PollRoutes.routes());
  };
}

export default new App().app;
