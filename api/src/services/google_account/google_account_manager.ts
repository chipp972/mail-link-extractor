import { Model } from 'mongoose';
import { Env, GoogleAccount, GoogleAccountManager, Lib, User } from '../../typedef';
import initGoogleAccountModel from './google_account_model';
import getProfile from './profile';
import { getAccessToken, refresh, revoke } from './token';

export function initGoogleAccountManager(env: Env, lib: Lib): GoogleAccountManager {
  const GoogleAccountModel: Model<GoogleAccount> = initGoogleAccountModel(lib);

  const getAccountOrThrow = async (id: string) => {
    try {
      const account = await GoogleAccountModel.findById(id);
      if (!account) {
        lib.logger.debug(`Account with id ${id} not found`);
        throw new Error(`Account with id ${id} not found`);
      }
      return account;
    } catch (err) {
      lib.logger.error(err);
      throw err;
    }
  };

  const createAccount = async ({ user, code }: { user: User; code: string }): Promise<GoogleAccount> => {
    try {
      const { tokens } = await getAccessToken(lib, code);
      const profile = await getProfile(lib, tokens);
      const googleAccount = await GoogleAccountModel.create({
        email: profile.email,
        userId: user.id,
        profile,
        credentials: tokens,
      });
      return googleAccount;
    } catch (err) {
      lib.logger.error(err);
      throw err;
    }
  };

  const refreshToken = async (googleAccountId: string) => {
    try {
      const account = await getAccountOrThrow(googleAccountId);
      const token = account.credentials.access_token || account.credentials.refresh_token;
      const { access_token, expires_in } = await refresh(env, lib, token);
      account.credentials.access_token = access_token;
      account.credentials.expiry_date = expires_in;
      return await account.save();
    } catch (err) {
      lib.logger.error(err);
      throw err;
    }
  };

  const revokeToken = async (googleAccountId: string) => {
    try {
      const account = await getAccountOrThrow(googleAccountId);
      const token = account.credentials.access_token || account.credentials.refresh_token;
      const result = await revoke(env, token);
      lib.logger.debug(result);
      delete account.credentials;
      return await account.save();
    } catch (err) {
      lib.logger.error(err);
      throw err;
    }
  };

  const deleteAccount = async (googleAccountId: string) => {
    try {
      const account = await revokeToken(googleAccountId);
      return await account.remove();
    } catch (err) {
      lib.logger.error(err);
      throw err;
    }
  };

  return {
    createAccount,
    refreshToken,
    revokeToken,
    deleteAccount,
  };
}

export default initGoogleAccountManager;
