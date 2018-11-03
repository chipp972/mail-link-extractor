import { HandlerObject } from 'express-registry';
import { googleAccountRoutes } from './google_account';
import { userCrudRoutes } from './user';

// export default function getRoutes(env: Env, lib: Lib, services: Services): HandlerObject[] {
export default function getRoutes(lib: Lib, services: Services): HandlerObject[] {
  return [...userCrudRoutes(services), ...googleAccountRoutes(lib, services)];
}
