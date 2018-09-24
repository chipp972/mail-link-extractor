import { Model } from 'mongoose';
import { User } from '../user/user_typedef';
import initGoogleAccountWithRegistry from './google_account_model';
import { GoogleAccount, GoogleAccountData } from './google_account_typedef';
import { getAccessTokenWithRegistry } from './token';
import { getProfileWithRegistry } from './profile';

interface CreateGoogleAccountInputs {
  user: User;
  code: string;
}

export const createGoogleAccount = (model: Model<GoogleAccount>) => async ({ user, code }: CreateGoogleAccountInputs): Promise<GoogleAccount> => {
  try {
    const { tokens } = await getAccessTokenWithRegistry(code);
    const profile = await getProfileWithRegistry(tokens);
    const googleAccount = await model.create({
      email: profile.email,
      userId: user.id,
      profile,
      credentials: tokens,
    });
    return googleAccount;
  } catch (err) {
    throw err;
  }
};

export function initGoogleAccountManager() {
  const GoogleAccountModel: Model<GoogleAccount> = initGoogleAccountWithRegistry();
  return {
    create: createGoogleAccount(GoogleAccountModel),
    // read: async (id: string) => await GoogleAccountModel.findById(id),
    // update: async (id: string, data: Partial<GoogleAccountData>) =>
    //   await GoogleAccountModel.findByIdAndUpdate(id, data),
    // delete: async (id: string) => await GoogleAccountModel.findByIdAndRemove(id),
  };
}

export default initGoogleAccountManager;
