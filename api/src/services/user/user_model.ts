import { Model, Schema } from 'mongoose';
import { emailRegex } from '../helpers/validation';
import { User } from './user_typedef';

export function initUserModel(lib: Lib): Model<User> {
  const UserSchema: Schema = new Schema({
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      match: emailRegex,
    },
  });
  return lib.db.model('User', UserSchema);
}

export default initUserModel;
