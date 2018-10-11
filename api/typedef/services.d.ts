import { GoogleAccountManager } from '../services/google_account/google_account_typedef';
import { UserManager } from '../services/user/user_typedef';
import { GmailManager } from '../services/gmail/gmail_typedef';

declare global {
  interface Services {
    user: UserManager;
    googleAccount: GoogleAccountManager;
    gmail: GmailManager;
  }
}
