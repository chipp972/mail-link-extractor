jest.mock('./user_model');
import initUserModelWithRegistry from './user_model';
initUserModelWithRegistry.mockImplementation(() => ({
    create: (data: any) => data,
    findById: (id: string) => id,
    findByIdAndUpdate: (id: string, data: any) => data,
    findByIdAndRemove: (id: string) => id
}));
import {initUserManager} from './user_manager';

describe('User manager', () => {
  const userManager = initUserManager();

  it('should be able to create an user', async () => {
    const user = await userManager.create({ email: 'test@gmail.com' });
    expect(user.email).toEqual('test@gmail.com');
  });

  it('should be able to find an user', async () => {
    const user = await userManager.read('test');
    expect(user).toEqual('test');
  });

  it('should be able to update an user', async () => {
    const user = await userManager.update('test', { email: 'test' });
    expect(user).toBeDefined();
    if (!user) {
      throw new Error('update failed');
    }
    expect(user.email).toEqual('test');
  });

  it('should be able to delete an user', async () => {
    expect(userManager.delete).toBeDefined();
  });
});
