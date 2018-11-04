import { NextFunction, Request } from 'express';
import { HandlerObject, Services } from '../../typedef';

export const userCrudRoutes = (services: Services): HandlerObject[] => [
  {
    method: 'get',
    url: '/api/users/:id',
    handler: async (req: Request, res: any, next: NextFunction) => {
      try {
        const userId = req.params.id;
        const user = await services.user.read(userId);
        if (!user) {
          return next(new Error(`No user found with id ${userId}`));
        }
        res.result = { data: user };
        return next();
      } catch (err) {
        return next(err);
      }
    },
  },
  {
    method: 'put',
    url: '/api/users/:id',
    handler: async (req: Request, res: any, next: NextFunction) => {
      try {
        const userId = req.params.id;
        const userData = req.body;
        const user = await services.user.update(userId, userData);
        if (!user) {
          return next(new Error(`No user found with id ${userId}`));
        }
        res.result = { data: user };
        return next();
      } catch (err) {
        return next(err);
      }
    },
  },

  {
    method: 'post',
    url: '/api/users',
    handler: async (req: Request, res: any, next: NextFunction) => {
      try {
        const userData = req.body;
        const user = await services.user.create(userData);
        res.result = { status: 201, data: user };
        return next();
      } catch (err) {
        return next(err);
      }
    },
  },

  {
    method: 'delete',
    url: '/api/users/:id',
    handler: async (req: Request, res: any, next: NextFunction) => {
      try {
        const userId = req.params.id;
        const user = await services.user.delete(userId);
        if (!user) {
          return next(new Error(`No user found with id ${userId}`));
        }
        res.result = { status: 203, data: user };
        return next();
      } catch (err) {
        return next(err);
      }
    },
  },
];
