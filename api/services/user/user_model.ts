import { Model, Schema } from 'mongoose';
import { injectRegistry } from 'singleton-module-registry';
import { ModelProps } from '../services_typedef';
import { User } from './user_typedef';

export function initUserModel({ database }: ModelProps<User>): Model<User> {
  const UserSchema: Schema = new database.Schema({
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/,
    },
  });
  return database.model('User', UserSchema);
}

export default injectRegistry<any, any, any>((registry) => ({
  database: registry.mongoose,
}))(initUserModel);
