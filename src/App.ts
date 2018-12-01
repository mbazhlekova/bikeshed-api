import * as express from 'express';
import * as pg from 'pg';

class App {
  public express;
  public dbClient;

  constructor() {
    this.express = express();
    this.dbClient = new pg.Client(process.env.DB_URL);
    this.mountRoutes();
  }

  private mountRoutes = async () => {
    const router = express.Router();
    router.get('/', async (req, res) => {
      await this.dbClient.connect(async (err, client, done) => {
        const results = [];
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }
        const query = await client.query('SELECT * FROM numbers');
        query.rows.forEach(row => results.push(row));
        await client.end();
        return res.json(results);
      });
    });
    this.express.use('/', router);
  };
}

export default new App().express;
