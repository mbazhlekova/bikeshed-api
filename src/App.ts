import * as express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.mountRoutes();
  }

  private mountRoutes = async () => {
    const router: express.Router = express.Router();
    const routes: Routes = new Routes();

    router.get('/polls', routes.getPolls.bind(routes.getPolls));

    this.app.use('/api', router);
  };
}

export default new App().app;
