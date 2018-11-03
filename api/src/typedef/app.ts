import { RequestHandlerParams, Router } from 'express-serve-static-core';

export interface HandlerObject {
  method: 'get' | 'post' | 'put' | 'delete' | 'all';
  url: string;
  handler: RequestHandlerParams;
}

export interface RouterObject {
  url?: string;
  router: Router;
}
