import mongoose from 'mongoose';
import { initGoogleAccountModel } from './google_account_model';
import { GoogleAccount } from './google_account_typedef';

const GoogleAccountModel = initGoogleAccountModel({ db: mongoose });

describe('GoogleAccount model Validation', () => {
  let account: GoogleAccount;
  beforeEach(() => {
    account = new GoogleAccountModel();
  });

  it('should not create GoogleAccount without email', () => {
    const { errors }: any = account.validateSync();
    expect(errors.email).toBeInstanceOf(Error);
  });

  it('should not create GoogleAccount with invalid email', () => {
    account.email = 'abcd';
    const { errors }: any = account.validateSync();
    expect(errors.email).toBeInstanceOf(Error);
  });

  it('should create GoogleAccount wit valid email', () => {
    account.email = 'test@gmail.com';
    const result = account.validateSync();
    expect(result).toBeUndefined();
  });
});
