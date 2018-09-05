import initGoogleServices from './google';
import initMongoose from './mongoose';

export default async function init(): Promise<Services> {
  try {
    const mongoose = await initMongoose();
    const googleAuth = initGoogleServices();
    return { mongoose, googleAuth };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
