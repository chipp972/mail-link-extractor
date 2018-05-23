import { OAuth2Client } from 'google-auth-library';
import { gmail_v1, google } from 'googleapis';

const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1' });

/**
 * list all labels of the user
 */
export const listLabels = (auth: OAuth2Client) =>
  gmail.users.labels
    .list({ userId: 'me', auth })
    .then((res) => res.data.labels);

/**
 * Create a label in the user gmail
 */
export const createLabel = (auth: OAuth2Client) =>
  gmail.users.labels
    .create({
      userId: 'me',
      requestBody: { name: 'LINK_EXTRACTED', type: 'user' },
      auth
    })
    .then((res) => res.data);

/**
 * Add labels to a message
 */
const addLabelsToMessage = (auth: OAuth2Client, labels: string[]) => (
  messageId: string
) =>
  gmail.users.messages
    .modify({
      userId: 'me',
      id: messageId,
      requestBody: { addLabelIds: labels, removeLabelIds: [] },
      auth
    })
    .then((res) => res.data.payload);

/**
 * Add labels to a list of messages
 */
export const addLabelsToMessageList = (
  auth: OAuth2Client,
  messageIdList: string[],
  labels: string[]
) => Promise.all(messageIdList.map(addLabelsToMessage(auth, labels)));
