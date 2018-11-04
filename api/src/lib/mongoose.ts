import mongoose, { Connection, ConnectionOptions } from 'mongoose';
import { Logger } from 'winston';
import { Env } from '../typedef';

export async function initMongoose(env: Env, logger: Logger): Promise<Connection> {
  mongoose.set('debug', env.isDev);

  const options: ConnectionOptions = {
    promiseLibrary: global.Promise,
    poolSize: env.database.mongoPoolSize,
    autoReconnect: env.isProd,
    useNewUrlParser: true,
  };

  try {
    const db: Connection = await mongoose.createConnection(env.database.mongodbUri, options);
    logger.debug(`Established connection with ${env.database.mongodbUri}`);
    return db;
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
}

export default initMongoose;
