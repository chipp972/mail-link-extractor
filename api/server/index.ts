import express from 'express';
import getMiddlewares from './middlewares';
import getRoutes from './routes';

export const startApp = () => {
  const app = express();
  const middlewares = getMiddlewares();
  const routes = getRoutes();

  middlewares.forEach(({ url, mw }) => app.use(url, mw));

  routes.forEach(({ url, method, route }) => app[method](url, route));

  // app.listen
}

export default startApp;

