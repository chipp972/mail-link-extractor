import initApp from './app';
import env from './env';
import initLib from './lib';
import startServer from './server';
import initServices from './services';

(async () => {
  try {
    const lib = await initLib(env);
    const services = initServices(env, lib);
    const app = initApp(env, lib, services);
    startServer(app, env, lib);
  } catch (err) {
    console.log('Uncaught error at init api', err);
  }
})();
