import { GmailManager } from './gmail';
import { GoogleAccountManager } from './google_account';
import { UserManager } from './user';

export * from './gmail';
export * from './google_account';
export * from './user';

export interface Services {
  user: UserManager;
  googleAccount: GoogleAccountManager;
  gmail: GmailManager;
}
