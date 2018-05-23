import { getExpressRegistry, HandlerObject } from 'express-registry';
import { getPocketAPI } from '../auth';
import { saveLinksToPocket } from './link';

export function getPocketLinkRoutes() {
  const registry = getExpressRegistry<Config, Lib, Services>();
  const { successResponse, errorResponse } = registry.getLib();
  const linkRoutes: HandlerObject[] = [
    {
      method: 'post',
      url: '/api/pocket/savelink',
      handler: async (req: any, res: any) => {
        try {
          const pocketApi = getPocketAPI(req.body.pocketUsername);
          const result = await saveLinksToPocket(pocketApi, req.data);
          return successResponse(res, result);
        } catch (err) {
          return errorResponse(res, err);
        }
      }
    }
  ];
  return linkRoutes;
}
