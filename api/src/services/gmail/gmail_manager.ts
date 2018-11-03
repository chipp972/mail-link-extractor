import { GmailManager, Lib } from '../../typedef';
import { addLabelsToMessageList } from './labels';
import { findLinksInMessageList } from './link';
import { getMessageList } from './message';

export const initGmailManager = (lib: Lib): GmailManager => ({
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
      const result = await addLabelsToMessageList(lib.googleAuth, messageIds, labels);
      return result;
    } catch (err) {
      lib.logger.error(err);
      throw err;
    }
  },
});

export default initGmailManager;
