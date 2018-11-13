import { OAuth2Client } from 'google-auth-library';
import { gmail_v1, google } from 'googleapis';

const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1' });

export const getMessage = (auth: OAuth2Client) => async (messageId: string) =>
  gmail.users.messages.get({ id: messageId, userId: 'me', auth }).then((res) => res.data);

export interface MessageListParams {
  auth: OAuth2Client;
  q?: string;
  maxResults?: number;
  pageToken?: string;
}

export const getMessageList = async ({
  auth,
  q = '*',
  maxResults,
  pageToken,
}: MessageListParams) => {
  try {
    const { data } = await gmail.users.messages.list({
      userId: 'me',
      maxResults,
      pageToken,
      q,
      auth,
    });
    const getGmailMessage = getMessage(auth);
    const messages = data.messages || [];
    const messagesData = await Promise.all(
      messages.map(({ id }) => (id ? getGmailMessage(id) : Promise.resolve(undefined)))
    );
    return messagesData;
  } catch (err) {
    throw err;
  }
};
