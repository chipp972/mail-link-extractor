import { getExpressRegistry } from 'express-registry';
import { Document, Model, Schema } from 'mongoose';

export interface PocketAuthData {
  requestToken: string;
  createdAt: Date;
}

export interface PocketAuth extends PocketAuthData, Document {}

export function initPocketAuthModel(): Model<PocketAuth> {
  const registry = getExpressRegistry<Config, Lib, Services>();

  const PocketAuthSchema: Schema = new Schema({
    requestToken: {
      type: String,
      default: 'no-token-yet'
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      index: { expires: 60 * 1 }
    }
  });

  const { mongoose } = registry.getServices();
  const model: Model<PocketAuth> = mongoose.model(
    'PocketAuth',
    PocketAuthSchema
  );
  registry.registerModule(model, 'PocketAuth');
  return model;
}
