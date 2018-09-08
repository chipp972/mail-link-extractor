import { getExpressRegistry } from 'express-registry';
import { Document, Model, Schema } from 'mongoose';

export interface PocketUserData {
  username: string;
  accessToken: string;
  requestId: string;
}

export interface PocketUser extends PocketUserData, Document {}

export function initPocketUserModel(): Model<PocketUser> {
  const registry = getExpressRegistry<Config, Lib, Services>();

  const PocketUserSchema: Schema = new Schema({
    username: String,
    accessToken: String,
    requestId: String
  });

  const { mongoose } = registry.getServices();
  const model: Model<PocketUser> = mongoose.model(
    'PocketUser',
    PocketUserSchema
  );
  registry.registerModule(model, 'PocketUser');
  return model;
}
