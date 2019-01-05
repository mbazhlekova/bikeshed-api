import * as dotenv from 'dotenv';
dotenv.config();

import app from './App';
import dbConnection from './db/db';

const port = process.env.PORT || 3000;

dbConnection
  .then(() =>
    app.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    })
  )
  .catch(console.error);
