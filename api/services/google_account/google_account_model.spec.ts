import mongoose from 'mongoose';
import { initGoogleAccountModel } from './google_account_model';

const GoogleAccount = initGoogleAccountModel({ database: mongoose });

describe('GoogleAccount model Validation', () => {
  it('should not create GoogleAccount without email', () => {
    const account = new GoogleAccount();
    account.email = '';
    const { errors }: any = account.validateSync();
    expect(errors.email).toBeInstanceOf(Error);
  });

  it('should not create GoogleAccount with invalid email', () => {
    const account = new GoogleAccount();
    account.email = 'abcd';
    const { errors }: any = account.validateSync();
    expect(errors.email).toBeInstanceOf(Error);
  });

  it('should create GoogleAccount wit valid email', () => {
    const account = new GoogleAccount();
    account.email = 'test@gmail.com';
    const result = account.validateSync();
    expect(result).toBeUndefined();
  });
});
