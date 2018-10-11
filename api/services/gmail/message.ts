import { OAuth2Client } from 'google-auth-library';
import { gmail_v1, google } from 'googleapis';
import { MessageData } from './gmail_typedef.ts';

const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1' });

export const getMessage = (auth: OAuth2Client) => async (messageId: string) =>
  gmail.users.messages.get({ id: messageId, userId: 'me', auth }).then((res) => res.data);

export interface MessageListParams {
  auth: OAuth2Client;
  q?: string;
  maxResults?: number;
  pageToken?: string;
}

export const getMessageList = ({ auth, q = '*', maxResults, pageToken }: MessageListParams): MessageData => {
  return new Promise((resolve, reject) => {
    gmail.users.messages
      .list({
        userId: 'me',
        maxResults,
        pageToken,
        q,
        auth,
      })
      .then(async (response) => {
        const getGmailMessage = getMessage(auth);
        const messages = response.data.messages || [];
        try {
          const messagesData = await Promise.all(
            messages.map(({ id }) => (id ? getGmailMessage(id) : Promise.resolve(undefined))),
          );
          resolve(messagesData);
        } catch (err) {
          reject(err);
        }
      });
  });
};
