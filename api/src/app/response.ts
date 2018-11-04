import { NextFunction } from 'express';
import { path } from 'ramda';
import { Env } from 'typedef';

export const getResponseHandlers = (env: Env): any[] => [
  {
    url: '/api',
    router: (_: Request, res: any, next: NextFunction) => {
      if (!res.result) {
        return next();
      }
      return res.status(path(['result', 'status'], res) || 200).json({
        success: true,
        data: path(['result', 'data'], res),
      });
    },
  },
  {
    url: '/api',
    router: (error: Error, _: any, res: any, __: NextFunction) =>
      res.status(path(['result', 'status'], res) || 500).json({
        success: false,
        error: env.isDev ? error.message : 'Unhandled server error',
      }),
  },
  {
    url: '/api',
    router: (_: any, res: any) =>
      res.status(404).json({
        success: false,
        error: 'Ressource not found',
      }),
  },
];

export default getResponseHandlers;
