import { Model, Schema } from 'mongoose';
import { Lib, User } from '../../typedef';
import { emailRegex } from '../helpers/validation';

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
