import { Model } from 'mongoose';
import initUserModelWithRegistry from './user_model';
import { User, UserData } from './user_typedef';

export function initUserManager() {
  const UserModel: Model<User> = initUserModelWithRegistry();
  return {
    create: async (data: UserData) => await UserModel.create(data),
    read: async (id: string) => await UserModel.findById(id),
    update: async (id: string, data: Partial<UserData>) => await UserModel.findByIdAndUpdate(id, data),
    delete: async (id: string) => await UserModel.findByIdAndRemove(id),
  };
}

export default initUserManager;
