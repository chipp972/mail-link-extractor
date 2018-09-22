import mongoose from 'mongoose';
import { initUserModel } from './user_model';

const User = initUserModel({ database: mongoose, SchemaConstructor: mongoose.Schema });

describe('User model Validation', () => {
  it('should not create User without email', () => {
    const user = new User();
    user.email = '';
    const { errors }: any = user.validateSync();
    expect(errors.email).toBeInstanceOf(Error);
  });

  it('should not create User with invalid email', () => {
    const user = new User();
    user.email = 'abcd';
    const { errors }: any = user.validateSync();
    expect(errors.email).toBeInstanceOf(Error);
  });

  it('should create User wit valid email', () => {
    const user = new User();
    user.email = 'test@gmail.com';
    const result = user.validateSync();
    expect(result).toBeUndefined();
  });
});
