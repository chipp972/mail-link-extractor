import { registerModule } from 'singleton-module-registry';
import env from './env';
import getLogger from './lib/logger';
import mongoose from './lib/mongoose';

export async function initRegistry() {
  try {
    registerModule('env', env);
    registerModule('logger', getLogger());
    registerModule('mongoose', await mongoose());
    console.log('test');
  } catch (err) {
    console.log('Uncaught error at init container', err);
  }
}
