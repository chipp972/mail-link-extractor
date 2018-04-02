import { Application } from 'express';
import GetPocket from 'node-getpocket';
import Pocket from 'pocket-promise';

export const initPocketAuth = (app: Application): void => {
  let code = '';
  let pocketApi: any;
  const config = {
    consumer_key: process.env.POCKET_CONSUMER_KEY,
    redirect_uri: process.env.POCKET_REDIRECT_URL,
  };

  const pocket = new GetPocket(config);

  app.get(
    '/auth/pocket',
    (_, __, next) => {
      const params = {
        redirect_uri: config.redirect_uri,
      };
      pocket.getRequestToken(params, function(err: Error, ___: any, body: any) {
        if (err) {
          console.log('Oops; getTokenRequest failed: ' + err);
        } else {
          // your request token is in body.code
          const json = JSON.parse(body);
          code = json.code;
          next();
        }
      });
    },
    (_, res) => {
      const conf = {
        consumer_key: config.consumer_key,
        request_token: code,
        redirect_uri: config.redirect_uri,
      };
      res.redirect(pocket.getAuthorizeURL(conf));
    },
  );

  app.get('/auth/pocket/callback', (_, res) => {
    pocket.getAccessToken(
      { request_token: code },
      (err: Error, __: any, body: any) => {
        try {
          if (err) {
            console.log('Oops; getTokenRequest failed: ' + err);
            return res.json({ success: false, err });
          }
          const { access_token } = JSON.parse(body);
          pocketApi = new Pocket({
            consumer_key: process.env.POCKET_CONSUMER_KEY,
            access_token,
          });
          return res.status(200).json({
            success: true,
            data: { access_token },
          });
        } catch (error) {
          return res.json({ success: false, error });
        }
      },
    );
  });

  // test route
  app.get('/pocket/retrieve', async (_, res) => {
    try {
      const data = await pocketApi.get({
        detailType: 'simple',
        count: 10,
      });
      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.json({ success: false, error });
    }
  });
};
