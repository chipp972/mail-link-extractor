import initGoogleAccountManager from './google_account/google_account_manager';
import initUserManager from './user/user_manager';
import initGmailManager from './gmail/gmail_manager';

export const initServices = (env: Env, lib: Lib): Services => {
  try {
    const user = initUserManager(lib);
    const googleAccount = initGoogleAccountManager(env, lib);
    const gmailManager = initGmailManager(lib);

    return { user, googleAccount, gmailManager };
  } catch (err) {
    lib.logger.error(err);
    throw err;
  }
};

export default initServices;
