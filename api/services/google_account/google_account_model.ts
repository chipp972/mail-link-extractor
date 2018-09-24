import { Model, Schema } from 'mongoose';
import { injectRegistry } from 'singleton-module-registry';
import { ModelProps } from '../services_typedef';
import { GoogleAccount } from './google_account_typedef';

export function initGoogleAccountModel({ database }: ModelProps<GoogleAccount>): Model<GoogleAccount> {
  const GoogleAccountSchema: Schema = new Schema({
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/,
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
  return database.model('GoogleAccount', GoogleAccountSchema);
}

export default injectRegistry<any, any, any>((registry) => ({
  database: registry.mongoose,
}))(initGoogleAccountModel);
