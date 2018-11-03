import { Model, Schema } from 'mongoose';
import { GoogleAccount, Lib } from '../../typedef';
import { emailRegex } from '../helpers/validation';

export function initGoogleAccountModel(lib: Lib): Model<GoogleAccount> {
  const GoogleAccountSchema: Schema = new Schema({
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      match: emailRegex,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    profile: {
      locale: String,
      picture: String,
      googleId: String,
    },
    credentials: {
      access_token: String,
      refresh_token: String,
      expiry_date: Number,
    },
  });
  return lib.db.model('GoogleAccount', GoogleAccountSchema);
}

export default initGoogleAccountModel;
