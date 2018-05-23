import { getExpressRegistry } from 'express-registry';
import { Document, Model, Schema } from 'mongoose';

export interface GoogleUserData {
  email: string;
  locale: 'fr' | 'en' | string;
  googleId: string;
  accessToken: string;
  refreshToken: string;
  idToken: string;
  tokenType: string;
  expiryDate: number;
}

export interface GoogleUser extends GoogleUserData, Document {}

export function initGoogleUserModel(): Model<GoogleUser> {
  const registry = getExpressRegistry<Config, Lib, Services>();

  const GoogleUserSchema: Schema = new Schema({
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    locale: String,
    googleId: String,
    accessToken: String,
    refreshToken: String,
    idToken: String,
    tokenType: String,
    expiryDate: Number
  });

  const { mongoose } = registry.getServices();
  const model: Model<GoogleUser> = mongoose.model(
    'GoogleUser',
    GoogleUserSchema
  );
  registry.registerModule(model, 'GoogleUser');
  return model;
}
