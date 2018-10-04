import { registerModule } from 'singleton-module-registry';
import initGoogleAuth from './google_auth';
import getLogger from './logger';
import mongoose from './mongoose';

export async function registerLib() {
  try {
    registerModule('logger', getLogger());
    registerModule('mongoose', await mongoose());
    registerModule('googleAuth', initGoogleAuth());
  } catch (err) {
    console.log('Error at init lib: ', err);
    throw err;
  }
}

export default registerLib;

