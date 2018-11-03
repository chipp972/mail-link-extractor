import { NextFunction } from 'express';
import { path } from 'ramda';

export const getResponseHandlers = (): any[] => [
  {
    url: '/api',
    router: (_: Request, res: any, next: NextFunction) => {
      if (!res.result) {
        return next();
      }
      return res.status(200).json({
        success: true,
        data: res.result,
      });
    },
  },
  {
    url: '/api',
    router: (error: any, _: any, res: any, __: NextFunction) =>
      res.status(path(['result', 'status'], res) || 500).json({
        success: false,
        error,
      }),
  },
  {
    url: '/api',
    router: (_: any, res: any) => res.status(404).json({ success: false }),
  },
];

export default getResponseHandlers;
