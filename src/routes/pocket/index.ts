import { getExpressRegistry, HandlerObject } from 'express-registry';
import { getPocketAPI, getPocketAuthRoutes } from './auth';
import { getPocketLinkRoutes } from './link';
import { initPocketAuthModel } from './pocket-auth.model';
import { initPocketUserModel } from './pocket.model';

export function initPocketRoutes(): HandlerObject[] {
  const registry = getExpressRegistry<Config, Lib, Services>();
  const { successResponse, errorResponse } = registry.getLib();

  // init models and add them to the registry
  initPocketUserModel();
  initPocketAuthModel();

  const authRoutes = getPocketAuthRoutes();
  const linkRoutes = getPocketLinkRoutes();

  return linkRoutes.concat(authRoutes, [
    {
      method: 'post',
      url: '/api/pocket/retrieve',
      handler: async (req: any, res: any) => {
        try {
          const pocketApi = await getPocketAPI(req.body.pocketUsername);
          const data = await pocketApi.get({
            detailType: 'simple',
            count: 10
          });
          return successResponse(res, data);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    }
  ]);
}
