import cors from 'cors';
import express from 'express';
import { join } from 'path';
import responseTimeMiddleware from 'response-time';
import { Env, RouterObject } from '../typedef';

export function getMiddlewares(env: Env): RouterObject[] {
  const base: any[] = [
    responseTimeMiddleware(),
    express.json(),
    express.urlencoded({ extended: true }),
  ];

  const devOnly: any[] = [
    cors({
      origin: env.devFrontOrigin,
      optionsSuccessStatus: 200,
    }),
  ];

  const prodOnly: any[] = [express.static(join(__dirname, '../static'))];

  const mw = env.isProd ? [...base, ...prodOnly] : [...base, ...devOnly];
  return mw.map((router) => ({ router }));
}

export default getMiddlewares;
