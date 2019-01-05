import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join, dirname } from 'path';

const baseDir = join(__dirname, '..');

const connectionsOpts: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'test',
  entities: [`${baseDir}/**/*.entity.ts`],
  synchronize: true,
};

const dbConnection: Promise<Connection> = createConnection(connectionsOpts);

export default dbConnection;
