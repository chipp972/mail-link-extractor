import { decode } from '@coolgk/base64';
import { compose, drop, equals, flatten, join, map, path, pathSatisfies } from 'ramda';
import { MessageData, MessagePart, MessagePayload } from './gmail_typedef';

const getMessagePayload = (obj?: MessageData): MessagePayload | {} => path(['data', 'payload'])(obj) || {};

const getMessageParts = (obj?: MessageData): MessagePart[] => path(['data', 'payload', 'parts'], obj) || [];

const getMessageBodyData: (obj?: MessagePayload | MessagePart | any) => string | undefined = path(['body', 'data']);

const isBodyEmpty: (obj: MessageData) => boolean = compose(
  pathSatisfies(equals(0), ['body', 'size']),
  getMessagePayload,
);

const findLinks = (text?: string): string[] => {
  if (!text) {
    return [];
  }
  // prettier-ignore
  const urlRE = RegExp(
    'a href\=\"(https?\:\/\/[a-z0-9\.\/\@\?\=\\-\&\;\#\!\$\%\*\_\+\n]+)\"',
    'gi',
  );
  let res: string[] = [];
  let tmp = urlRE.exec(text);
  while (tmp !== null) {
    res = res.concat(drop(1, tmp));
    tmp = urlRE.exec(text);
  }
  return res.map(encodeURI); // avoid parsing problem for pocket
};

const findLinksInBody: (obj: MessageData) => string[] = compose(
  findLinks,
  decode,
  getMessageBodyData,
  getMessagePayload,
);

const findLinksInParts: (obj: MessageData) => string[] = compose(
  findLinks,
  join(''),
  map(decode),
  map(getMessageBodyData),
  getMessageParts,
);

/**
 * Find all links in a message object from gmail API
 *
 * @param {MessageData} obj message object
 * @return {string[]} link array
 */
export const findLinksInMessage = (obj?: MessageData): string[] => {
  try {
    if (!obj) {
      return [];
    }
    return isBodyEmpty(obj) ? findLinksInParts(obj) : findLinksInBody(obj);
  } catch (err) {
    throw err;
  }
};

export const findLinksInMessageList = (objs: MessageData[]): string[] => flatten<string>(map(findLinksInMessage, objs));

/**
 * Lists the messages in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
// export async function listMessageLinks(): Promise<string[]> {
//   try {
//     const auth: OAuth2Client = await getAuth();
//     const gmail = google.gmail({ version: 'v1', auth });
//     const messages = await getMessageList({
//       gmail,
//       // q: 'from:medium|quincy',
//       q: 'subject:pocket-mail-test',
//       maxResults: 10,
//     });
//     // const labels = await listLabels(gmail);
//     // console.log(labels);

//     // do an action on all parsed messages (tag for now)
//     const res = await addLabelsToMessageList({
//       gmail,
//       messageIdList: messages.map((msg) => msg.data.id),
//       labels: ['UNREAD'],
//     });
//     console.log(res);

//     const links: string[] = findLinksInMessageList(messages);
//     return links;
//   } catch (err) {
//     throw err;
//   }
// }
