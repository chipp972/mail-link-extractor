import cors from 'cors';
import express from 'express';
import { RouterObject } from 'express-registry';
import { join } from 'path';

export default function getExpressMiddlewares(): RouterObject[] {
  const mw: any[] = [
    cors({
      origin: 'http://localhost:5000',
      optionsSuccessStatus: 200,
    }),
    express.json(),
    express.urlencoded({ extended: true }),
    express.static(join(__dirname, '../static')),
  ].map((router) => ({ router }));

  return mw;
}
