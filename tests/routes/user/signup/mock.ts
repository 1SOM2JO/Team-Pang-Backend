import { mockUserFindById } from '../signin/mock';
import { USER_ID, PERMISSION, USER_PASSWORD_HASH } from '../signin/mock';
import { User } from '../../../../src/database/model/User';
import bcrypt from 'bcrypt';
import { nexmo } from '../../../../src/middleware/smsSender';
import { client } from '../../../../src/app';

export const API_KEY = 'abc';
export const addHeaders = (request: any) => request.set('x-api-key', API_KEY);

export const TEST_ID = 'testid01';
export const USER_NICKNAME = 'test';
export const USER_PHONENUMBER = '010-7164-0087';
export const USER_PHONENUMBER2 = '010-1234-5678';

export const randomNumSpy = jest.spyOn(Math, 'random');

export const bcryptHashSpy = jest.spyOn(bcrypt, 'hash');
export const smsSendSpy = jest.spyOn(nexmo.message, 'sendSms');

export const redisSetSpy = client.set = jest.fn();
export const redisGetSpy = client.get = jest.fn();

export const mockUserCreate = jest.fn(
  async (
    permission: string,
    id: string,
    nickname: string,
    password: string,
    phonenumber: string,
  ): Promise<{ user: User }> => {
    return {
      user: {
        uuid: 2,
        permission: PERMISSION,
        id: TEST_ID,
        nickname: USER_NICKNAME,
        password: USER_PASSWORD_HASH,
        phonenumber: USER_PHONENUMBER2,
      } as User,
    };
  },
);

export const mockUserFindByPhone = jest.fn(
  async (phonenumber: string): Promise<User> => {
    if (phonenumber === USER_PHONENUMBER)
      return {
        uuid: 1,
        permission: PERMISSION,
        id: USER_ID,
        nickname: USER_NICKNAME,
        password: USER_PASSWORD_HASH,
        phonenumber: USER_PHONENUMBER,
        accessTokenKey: null,
        refreshTokenKey: null,
      } as User;
    return null;
  },
);

jest.mock('../../../../src/database/repository/UserRepo', () => ({
  get findById() {
    return mockUserFindById;
  },

  get findByPhonenumber() {
    return mockUserFindByPhone;
  },

  get createUser() {
    return mockUserCreate;
  },
}));
