import * as mongoose from 'mongoose';

(mongoose as any).Promise = global.Promise;

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/bikeshed`,
  { useNewUrlParser: true }
);

export { mongoose };
