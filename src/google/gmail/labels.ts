import { path } from 'ramda';

export const listLabels = (gmail: any): Promise<GmailLabel[]> =>
  new Promise((resolve, reject) => {
    gmail.users.labels.list(
      {
        userId: 'me',
      },
      (err: Error, res: { data: { labels: GmailLabel[] } }) => {
        if (err) reject(err);
        resolve(path(['data', 'labels'], res));
      },
    );
  });

const addLabelsToMessage = ({
  gmail,
  labels,
}: {
  gmail: any;
  labels: string[];
}) => (messageId: string): Promise<any> =>
  new Promise((resolve, reject) => {
    gmail.users.messages.modify(
      {
        userId: 'me',
        id: messageId,
        resource: { addLabelIds: labels, removeLabelIds: [] },
      },
      (err: Error, res: any) => {
        if (err) reject(err);
        resolve(res);
      },
    );
  });

export const addLabelsToMessageList = ({
  gmail,
  messageIdList,
  labels,
}: {
  gmail: any;
  messageIdList: string[];
  labels: string[];
}) => Promise.all(messageIdList.map(addLabelsToMessage({ gmail, labels })));
