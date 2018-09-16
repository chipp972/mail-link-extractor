import mongoose, { Connection, ConnectionOptions } from 'mongoose';
import { injectRegistry } from 'singleton-module-registry';
import { Logger } from 'winston';

interface Props {
  isDebug: boolean;
  isProd: boolean;
  mongoPoolSize: number;
  mongodbUri: string;
  logger: Logger;
}

export async function init({ isDebug, isProd, mongoPoolSize, mongodbUri, logger }: Props): Promise<Connection> {
  mongoose.Promise = global.Promise;

  mongoose.set('debug', isDebug);

  const options: ConnectionOptions = {
    promiseLibrary: global.Promise,
    poolSize: mongoPoolSize,
    autoReconnect: isProd,
    useNewUrlParser: true,
  };

  try {
    const db: Connection = await mongoose.createConnection(mongodbUri, options);
    return db;
  } catch (err) {
    logger.error(err, 'mongoose connexion');
    throw err;
  }
}

export default injectRegistry<any, any, Promise<Connection>>((registry) => ({
  isDebug: registry.env.isDebug,
  isProd: registry.env.isProd,
  mongoPoolSize: registry.env.database.mongoPoolSize,
  mongodbUri: registry.env.database.mongodbUri,
  logger: registry.logger,
}))(init);