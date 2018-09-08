import { getExpressRegistry, HandlerObject } from 'express-registry';
import { Model } from 'mongoose';
import { GoogleUser, initGoogleUserModel } from './google.model';
import { getUserInfos } from './profile/profile';

export function initGoogleRoutes(): HandlerObject[] {
  const registry = getExpressRegistry<Config, Lib, Services>();
  const { successResponse, errorResponse } = registry.getLib();
  const { googleAuth } = registry.getServices();
  const GoogleUserModel: Model<GoogleUser> = initGoogleUserModel();

  return [
    {
      method: 'post',
      url: '/api/google/sendcode',
      handler: async (req: any, res: any) => {
        if (!req.headers['x-requested-with']) {
          errorResponse(res, new Error('Potential security risk'));
          return;
        }

        try {
          const { tokens } = await googleAuth.getToken(req.body.code);
          const profile = await getUserInfos(tokens);
          const user = await GoogleUserModel.findOneAndUpdate(
            { email: profile.email },
            {
              email: profile.email,
              googleId: profile.id,
              locale: profile.locale,
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token,
              expiryDate: tokens.expiry_date,
              tokenType: tokens.token_type
            },
            { upsert: true, new: true }
          );
          successResponse(res, {
            _id: user._id,
            email: user.email,
            expiryDate: user.expiryDate
          });
        } catch (error) {
          errorResponse(res, error);
        }
      }
    },
    {
      method: 'get',
      url: '/session/test',
      handler: async (req: any, res: any) => {
        const { env } = registry.getConfig();
        const users: GoogleUser[] = await GoogleUserModel.find({});
        const session = req.session;
        console.log(req.session.id);
        return successResponse(res, { env, users, session });
      }
    }
  ];
}
