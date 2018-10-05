import {Env} from '../env';
import {Lib} from './lib_typedef.ts'
import initGoogleAuth from './google_auth';
import initLogger from './logger';
import initMongoose from './mongoose';

export {Lib} from './lib_typedef.ts'

export async function initLib(env: Env): Lib {
  try {
    const logger = initLogger(env);
    const googleAuth = initGoogleAuth(env)
    const db = await initMongoose(env, logger);
    return { logger, db, googleAuth };
  } catch (err) {
    console.log('Error at init lib: ', err);
    throw err;
  }
}

export default initLib;

