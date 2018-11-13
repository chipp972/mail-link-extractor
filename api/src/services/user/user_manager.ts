import { Model } from 'mongoose';
import { Lib, User, UserData, UserManager } from '../../typedef';
import { initUserModel } from './user_model';

export function initUserManager(lib: Lib): UserManager {
  const UserModel: Model<User> = initUserModel(lib);
  return {
    create: async (data: UserData) => await UserModel.create(data),
    read: async (id: string) => await UserModel.findById(id),
    update: async (id: string, data: Partial<UserData>) =>
      await UserModel.findByIdAndUpdate(id, data),
    delete: async (id: string) => await UserModel.findByIdAndRemove(id),
  };
}

export default initUserManager;
