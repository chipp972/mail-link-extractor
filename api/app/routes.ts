import { HandlerObject } from 'express-registry';
import { googleAccountRoutes } from './google_account';
import { userCrudRoutes } from './user';
// import { initGoogleRoutes } from './google';
// import { initPocketRoutes } from './pocket';

export default function getRoutes(env: Env, lib: Lib, services: Services): HandlerObject[] {
  // const pocketRoutes = initPocketRoutes();
  // const googleRoutes = initGoogleRoutes();
  // return [...googleRoutes, ...pocketRoutes];
  console.log(env);
  console.log(lib);
  return userCrudRoutes(services).concat(googleAccountRoutes(services));
}
