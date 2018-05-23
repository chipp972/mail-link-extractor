import { getExpressRegistry } from 'express-registry';
import mongoose, { Connection, ConnectionOptions } from 'mongoose';
import initMockgoose from './mockgoose';

export default async function init(): Promise<Connection> {
  mongoose.Promise = global.Promise;

  const registry = getExpressRegistry<Config, Lib, Services>();
  const { env } = registry.getConfig();
  const { logger } = registry.getLib();

  mongoose.set('debug', env.isDebug);

  const options: ConnectionOptions = {
    promiseLibrary: global.Promise,
    poolSize: env.database.mongoPoolSize,
    autoReconnect: env.isProd,
    useNewUrlParser: true
  };

  try {
    const db: Connection = await mongoose.createConnection(
      env.database.mongodbUri,
      options
    );
    return db;
  } catch (err) {
    if (env.isProd) {
      logger.error(err, 'mongoose connexion');
      throw err;
    }
    // Use mockgoose to mock the data store
    try {
      logger.debug('Using Mockgoose');
      const mockedDb: Connection = await initMockgoose(
        env.database.mongodbUri,
        options
      );
      return mockedDb;
    } catch (err) {
      logger.error(err, 'mockgoose connexion');
      throw err;
    }
  }
}
