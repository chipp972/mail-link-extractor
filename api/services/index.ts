import initGmailManager from './gmail/gmail_manager';
import initGoogleAccountManager from './google_account/google_account_manager';
import initUserManager from './user/user_manager';

export const initServices = (env: Env, lib: Lib): Services => {
  try {
    const user = initUserManager(lib);
    const googleAccount = initGoogleAccountManager(env, lib);
    const gmail = initGmailManager(lib);

    return { user, googleAccount, gmail };
  } catch (err) {
    lib.logger.error(err);
    throw err;
  }
};

export default initServices;
