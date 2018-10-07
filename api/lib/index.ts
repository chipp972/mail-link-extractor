import initGoogleAuth from './google_auth';
import initLogger from './logger';
import initMongoose from './mongoose';

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
