import express from 'express';
import getMiddlewares from './middlewares';
import getResponseHandlers from './response';
import getRoutes from './routes';

export const initApp = (env: Env, lib: Lib, services: Services) => {
  const app = express();
  getMiddlewares(env).forEach(({ url, router }) => app.use(url || '/', router));
  getRoutes(env, lib, services).forEach(({ url, method, handler }) => app[method](url, handler));
  getResponseHandlers().forEach(({ url, router }: any) => app.use(url || '/', router));
  return app;
};

export default initApp;
