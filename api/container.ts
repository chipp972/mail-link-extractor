import { registerModule } from 'singleton-module-registry';
import env from './env';
import initGoogleAuth from './lib/google_auth';
import getLogger from './lib/logger';
import mongoose from './lib/mongoose';

export async function initRegistry() {
  try {
    registerModule('env', env);
    registerModule('logger', getLogger());
    registerModule('mongoose', await mongoose());
    registerModule('googleAuth', initGoogleAuth());
  } catch (err) {
    console.log('Error at init container: ', err);
    throw err;
  }
}
