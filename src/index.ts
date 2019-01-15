import * as dotenv from 'dotenv';
dotenv.config();

import app from './App';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  return console.log(`magic happening on port ${port}`);
});
