import { Env, Lib } from '../typedef';
import initGoogleAuth from './google_auth';
import initLogger from './logger';
import initMongoose from './mongoose';

/**
 * Initializes and return all 3rd party libraries needed to run the project
 *
 * @param {Env} env environment variables
 * @return {Lib} initialized 3rd party libraries
 */
export async function initLib(env: Env): Promise<Lib> {
  try {
    const logger = initLogger(env);
    const googleAuth = initGoogleAuth(env.google.auth);
    const db = await initMongoose(env, logger);
    return { logger, db, googleAuth };
  } catch (err) {
    console.error('Error at init lib: ', err);
    throw err;
  }
}

export default initLib;
