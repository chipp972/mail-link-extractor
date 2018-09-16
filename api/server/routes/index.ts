import { HandlerObject } from 'express-registry';
import { initGoogleRoutes } from './google';
import { initPocketRoutes } from './pocket';

export default function getRoutes(): HandlerObject[] {
  const pocketRoutes = initPocketRoutes();
  const googleRoutes = initGoogleRoutes();
  return [...googleRoutes, ...pocketRoutes];
}
