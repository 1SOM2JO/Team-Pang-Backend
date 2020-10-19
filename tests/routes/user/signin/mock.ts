import bcrypt from 'bcrypt';
import * as authUtils from '../../../../src/auth/authUtils';
import { User } from '../../../../src/database/model/User';

export const addHeaders = (request: any) => request.set('x-api-key', 'abc');

export const USER_ID = 'testid00';
export const PERMISSION = 'ADMIN';
export const USER_PASSWORD = 'abc123';
export const USER_PASSWORD_HASH = bcrypt.hashSync(USER_PASSWORD, 10);

export const createTokensSpy = jest.spyOn(authUtils, 'createTokens');

export const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare');

export const mockUserKeyUpdate = jest.fn(
  async (
    client: number,
    primaryKey: string,
    secondaryKey: string,
  ): Promise<User> => {
    return {
      uuid: client,
      accessTokenKey: primaryKey,
      refreshTokenKey: secondaryKey,
    } as User;
  },
);

export const mockUserFindById = jest.fn(
  async (id: string): Promise<User> => {
    if (id === USER_ID)
      return {
        uuid: 1,
        permission: PERMISSION,
        id: USER_ID,
        nickname: '010-7164-0087',
        password: USER_PASSWORD_HASH,
        phonenumber: 'test',
        accessTokenKey: null,
        refreshTokenKey: null,
      } as User;
    return null;
  },
);

jest.mock('../../../../src/database/repository/UserRepo', () => ({
  get UserKeyUpdate() {
    return mockUserKeyUpdate;
  },
}));

jest.mock('../../../../src/database/repository/UserRepo', () => ({
  get findById() {
    return mockUserFindById;
  },
}));

jest.unmock('../../../../src/auth/authUtils');
