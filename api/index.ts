import { getExpressRegistry } from 'express-registry';
import getConfig from './config';
import getLib from './lib';
import getMiddlewares from './middlewares';
import getRoutes from './routes';
import getServices from './service';

(async () => {
  try {
    const config = await getConfig();
    const registry = getExpressRegistry<Config, Lib, Services>(config.env.port);

    registry.on('error', (err: Error) => console.log('Runtime error', err));

    registry
      .addConfig(config)
      .addLib(await getLib())
      .addServices(await getServices())
      .addMiddlewares(getMiddlewares())
      .addRoutes(getRoutes())
      .startServer();
  } catch (err) {
    console.log('Uncaught error at init', err);
  }
})();
