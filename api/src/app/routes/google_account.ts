import { NextFunction } from 'express';
import { HandlerObject, Lib, Services } from '../../typedef';

export const googleAccountRoutes = (lib: Lib, services: Services): HandlerObject[] => [
  {
    method: 'post',
    url: '/api/google/sendcode',
    handler: async (req: any, res: any, next: NextFunction) => {
      if (!req.xhr) {
        return next(new Error('Potential security risk'));
      }
      const { code } = req.body;
      if (!code) {
        res.result = { status: 400 };
        return next(new Error('Missing needed parameter in body : code'));
      }

      try {
        // TODO: get user from req via authentication
        const currentUser = await services.user.read('5bb94a27701b2947d91fe40c');
        // TODO: put this in a "permission" mw
        if (!currentUser) {
          return next(new Error('Not a valid user'));
        }
        console.log(currentUser);
        const account = await services.googleAccount.createAccount({
          user: currentUser,
          code,
        });
        lib.logger.debug(account);
        res.result = { data: account };
        return next();
      } catch (err) {
        return next(err);
      }
    },
  },
];
