import cors from 'cors';
import express from 'express';
import { RouterObject } from 'express-registry';
import { join } from 'path';
import responseTimeMiddleware from 'response-time';

export function getMiddlewares(env: Env): RouterObject[] {
  const mw: any[] = [
    responseTimeMiddleware(),
    cors({
      origin: `${env.hostname}:${env.port}`,
      optionsSuccessStatus: 200,
    }),
    express.json(),
    express.urlencoded({ extended: true }),
    express.static(join(__dirname, '../static')),
  ].map((router) => ({ router }));

  return mw;
}

export default getMiddlewares;