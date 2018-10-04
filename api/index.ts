import { registerModule } from 'singleton-module-registry';
import env from './env';
import registerLib from './lib';
import registerServices from './services';
import startApp from './server';

(async () => {
  try {
    registerModule('env', env);
    await registerLib();
    await registerServices();
    await startApp();
  } catch (err) {
    console.log('Uncaught error at init api', err);
  }
})();
