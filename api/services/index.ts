import { registerModule } from 'singleton-module-registry';
import initUserManager from './user/user_manager';

export const registerServices = () => {
  registerModule('user', initUserManager());
};

export default registerServices;
