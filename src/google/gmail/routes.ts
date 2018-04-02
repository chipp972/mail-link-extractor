import { Application, NextFunction, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { getAuth } from '../auth';
import { listLabels } from './labels';

export const initGmailRoutes = async (app: Application): Promise<void> => {
  try {
    const auth: OAuth2Client = await getAuth();
    const gmail = google.gmail({ version: 'v1', auth });
    // get an user label list
    app.get(
      '/gmail/labels/:id',
      async (_, res: Response, next: NextFunction) => {
        try {
          const labels = await listLabels(gmail); // TODO: get userId from req.user.gmailId
          res.json({ success: true, data: { labels } });
        } catch (err) {
          next(err);
        }
      },
    );
  } catch (err) {
    throw err;
  }
};
