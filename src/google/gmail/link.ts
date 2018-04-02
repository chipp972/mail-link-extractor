import { decode } from '@coolgk/base64';
import {
  compose,
  drop,
  equals,
  flatten,
  join,
  map,
  path,
  pathSatisfies,
} from 'ramda';

const getMessagePayload = (obj?: MessageData): MessagePayload | {} =>
  path(['data', 'payload'])(obj) || {};

const getMessageParts = (obj?: MessageData): MessagePart[] =>
  path(['data', 'payload', 'parts'], obj) || [];

const getMessageBodyData: (
  obj?: MessagePayload | MessagePart | any,
) => string | undefined = path(['body', 'data']);

const isBodyEmpty: (obj: MessageData) => boolean = compose(
  pathSatisfies(equals(0), ['body', 'size']),
  getMessagePayload,
);

const findLinks = (text?: string): string[] => {
  if (!text) return [];
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
    if (!obj) return [];
    return isBodyEmpty(obj) ? findLinksInParts(obj) : findLinksInBody(obj);
  } catch (err) {
    throw err;
  }
};

export const findLinksInMessageList = (objs: MessageData[]): string[] =>
  flatten<string>(map(findLinksInMessage, objs));
