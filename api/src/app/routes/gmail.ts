import { NextFunction } from 'express';
import { HandlerObject, Services } from '../../typedef';

export const gmailRoutes = (services: Services): HandlerObject[] => [
  {
    method: 'post',
    url: '/api/gmail/extract-links',
    handler: async (req: any, res: any, next: NextFunction) => {
      if (!req.headers['x-requested-with']) {
        return next(new Error('Potential security risk'));
      }

      try {
        // const { googleAccountId, query } = req.body;
        // TODO: get user from req via authentication
        const currentUser = await services.user.read('5bb94a27701b2947d91fe40c');
        // TODO: put this in a "permission" mw
        if (!currentUser) {
          return next(new Error('Not a valid user'));
        }
        const account = await services.googleAccount.createAccount({
          user: currentUser,
          code: req.body.code,
        });
        res.result = { account };
        return next();
      } catch (err) {
        return next(err);
      }
    },
  },
];
