import { HandlerObject, Lib, Services } from '../../typedef';
import { gmailRoutes } from './gmail';
import { googleAccountRoutes } from './google_account';
import { userCrudRoutes } from './user';

export default function getRoutes(lib: Lib, services: Services): HandlerObject[] {
  return [...userCrudRoutes(services), ...googleAccountRoutes(lib, services), ...gmailRoutes(services)];
}
