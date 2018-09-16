import { getExpressRegistry, HandlerObject } from 'express-registry';
import { Model } from 'mongoose';
import GetPocket from 'node-getpocket';
import Pocket from 'pocket-promise';
import { PocketAuth } from '../pocket-auth.model';
import { PocketUser } from '../pocket.model';

interface AccessTokenResponse {
  username: string;
  access_token: string;
}

export const getPocketAuthRoutes = (): HandlerObject[] => {
  const registry = getExpressRegistry<Config, Lib, Services>();
  const PocketUserModel = registry.getModule('PocketUser') as Model<PocketUser>;
  const PocketAuthModel = registry.getModule('PocketAuth') as Model<PocketAuth>;
  const { successResponse, errorResponse } = registry.getLib();
  const { env } = registry.getConfig();

  const pocket = new GetPocket(env.pocket);

  function getRequestToken(uri: string): Promise<string> {
    return new Promise((resolve, reject) =>
      pocket.getRequestToken({ redirect_uri: uri }, (err: Error, _: any, body: any) => {
        if (err) {
          return reject(err);
        }
        const json = JSON.parse(body);
        resolve(json.code);
      }),
    );
  }

  function getAccessToken(requestToken: string): Promise<AccessTokenResponse> {
    return new Promise(async (resolve, reject) => {
      pocket.getAccessToken({ request_token: requestToken }, (err: Error, _: any, body: any) => {
        if (err) {
          return reject(err);
        }
        const json = JSON.parse(body);
        resolve(json);
      });
    });
  }

  return [
    {
      method: 'get',
      url: '/api/pocket/authorize-url',
      handler: async (_: any, res: any) => {
        try {
          const auth = await PocketAuthModel.create({});
          const code = await getRequestToken(`${env.pocket.redirect_uri}${auth._id}`);
          const url = pocket.getAuthorizeURL({
            ...env.pocket,
            request_token: code,
          });
          await auth.update({ requestToken: code });
          return successResponse(res, {
            pocketRequestId: auth._id,
            url: `${url}${auth._id}`,
          });
        } catch (err) {
          return errorResponse(res, err);
        }
      },
    },
    {
      method: 'get',
      url: '/api/pocket/auth-callback/:id',
      handler: async (req: any, res: any) => {
        try {
          const auth = await PocketAuthModel.findById(req.params.id || '');
          if (!auth) {
            return errorResponse(res, new Error('No corresponding pocket auth request'));
          }
          const { username, access_token } = await getAccessToken(auth.requestToken);
          // FIXME: use a user model with google account to have a mail adress
          // to send passwordless authentication on subsequent auth
          const user = await PocketUserModel.findOneAndUpdate(
            { username },
            {
              username,
              accessToken: access_token,
              requestId: req.params.id,
            },
            { upsert: true, new: true },
          );
          console.log(JSON.stringify(user), 'user');
          return res.redirect('/');
        } catch (err) {
          return errorResponse(res, err);
        }
      },
    },
    {
      method: 'get',
      url: '/api/pocket/user-from-request/:id',
      handler: async (req: any, res: any) => {
        try {
          const user = (await PocketUserModel.findOne({
            requestId: req.params.id,
          })) || { _id: null, username: '' };
          console.log(JSON.stringify(user), 'user');
          return successResponse(res, {
            _id: user._id,
            username: user.username,
          });
        } catch (err) {
          return errorResponse(res, err);
        }
      },
    },
  ];
};

/**
 * Retrieve user's access token in database
 * return an object to execute API request
 */
export async function getPocketAPI(username: string) {
  const registry = getExpressRegistry<Config, Lib, Services>();
  const { env } = registry.getConfig();
  const PocketUserModel = registry.getModule('PocketUser') as Model<PocketUser>;
  const user = await PocketUserModel.findOne({ username });
  if (!user) {
    throw new Error(`No user with username ${username} found`);
  }
  return new Pocket({
    consumer_key: env.pocket.consumer_key,
    access_token: user.accessToken || '',
  });
}
