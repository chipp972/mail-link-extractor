import {GmailManager} from './gmail_typedef';
import {getMessageList} from './message';
import {findLinksInMessageList} from './link';
import {addLabelsToMessageList} from './labels';

export function initGmailManager(lib: Lib): GmailManager {
  return {
    getMessagesLinks: async (googleAccount, query, maxResults) => {
      try {
        lib.googleAuth.setCredentials(googleAccount.credentials);
        const messages = await getMessageList({
          auth: lib.googleAuth,
          q: query,
          maxResults,
        });
        return findLinksInMessageList(messages);
      } catch (err) {
        lib.logger.error(err);
        throw err;
      }
    },
    addLabelsToMessages: async (googleAccount, messageIds, labels) => {
      try {
        lib.googleAuth.setCredentials(googleAccount.credentials);
        const result = await addLabelsToMessageList(googleAuth, messageIds, labels);
        return result;
      } catch (err) {
        lib.logger.error(err);
        throw err;
      }
  };
}

export default initGmailManager;
