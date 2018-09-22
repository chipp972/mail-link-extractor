import { Model, Schema } from 'mongoose';
import { injectRegistry } from 'singleton-module-registry';
import { User } from './user_typedef';

interface Props {
  SchemaConstructor: any;
  database: { model: (collectionName: string, sch: Schema) => Model<any> };
}

export function initUserModel({ SchemaConstructor, database }: Props): Model<User> {
  const UserSchema: Schema = new SchemaConstructor({
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
  SchemaConstructor: registry.mongoose.Schema,
  database: registry.mongoose,
}))(initUserModel);
