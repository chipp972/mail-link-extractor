import { path } from 'ramda';

const getMessageListItems: (
  obj: MessageListResponse,
) => MessageListItem[] | undefined = path(['data', 'messages']);

export const getMessage = (gmail: any) => async (
  messageId: string,
): Promise<any> =>
  new Promise((resolve, reject) => {
    gmail.users.messages.get(
      { id: messageId, userId: 'me' },
      (err: Error, res: MessageData) => {
        if (err) reject(err);
        resolve(res);
      },
    );
  });

export const getMessageList = ({
  gmail,
  q = '*',
  maxResults = 2,
  pageToken,
}: MessageListParams): Promise<MessageData[]> => {
  return new Promise((resolve, reject) => {
    gmail.users.messages.list(
      {
        userId: 'me',
        maxResults,
        pageToken,
        q,
      },
      async (err: Error, response: MessageListResponse) => {
        if (err) reject(err);
        const getGmailMessage = getMessage(gmail);
        const messages = getMessageListItems(response) || [];
        try {
          const messagesData = await Promise.all(
            messages.map(({ id }: MessageListItem) => getGmailMessage(id)),
          );
          resolve(messagesData);
        } catch (err) {
          reject(err);
        }
      },
    );
  });
};
