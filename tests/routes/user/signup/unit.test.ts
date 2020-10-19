import {
  USER_ID,
  PERMISSION,
  USER_PASSWORD_HASH,
  mockUserFindById,
  USER_PASSWORD,
} from '../signin/mock';
import {
  TEST_ID,
  addHeaders,
  USER_NICKNAME,
  USER_PHONENUMBER,
  bcryptHashSpy,
  smsSendSpy,
  mockUserCreate,
  mockUserFindByPhone,
  randomNumSpy,
  redisSetSpy,
  redisGetSpy,
  USER_PHONENUMBER2,
} from './mock';

import supertest from 'supertest';
import app from '../../../../src/app';

describe('signup smsSender route', () => {
  const endpoint = '/v1/signup/smsSender';
  const request = supertest(app);

  beforeEach(() => {
    mockUserFindByPhone.mockClear();
    randomNumSpy.mockClear();
    smsSendSpy.mockClear();
    redisSetSpy.mockClear();
  });

  it('Should send error when empty phonenumber is sent', async () => {
    const response = await addHeaders(request.post(endpoint));
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/phonenumber/);
    expect(response.body.message).toMatch(/required/);
    expect(mockUserFindByPhone).not.toBeCalled();
    expect(randomNumSpy).not.toBeCalled();
    expect(smsSendSpy).not.toBeCalled();
    expect(redisSetSpy).not.toBeCalled();
  });

  it('Should send error when phonenumber is not valid format', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ phonenumber: '123' }),
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/valid phonenumber/);
    expect(mockUserFindByPhone).not.toBeCalled();
    expect(randomNumSpy).not.toBeCalled();
    expect(smsSendSpy).not.toBeCalled();
    expect(redisSetSpy).not.toBeCalled();
  });

  it('Should send error when user is registered for phonenumber', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ phonenumber: USER_PHONENUMBER }),
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/already registered/);
    expect(mockUserFindByPhone).toBeCalledTimes(1);
    expect(randomNumSpy).not.toBeCalled();
    expect(smsSendSpy).not.toBeCalled();
    expect(redisSetSpy).not.toBeCalled();
  });

  it('Should send success', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ phonenumber: USER_PHONENUMBER2 }),
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/send success/);
    expect(mockUserFindByPhone).toBeCalledTimes(1);
    expect(randomNumSpy).toBeCalledTimes(1);
    expect(smsSendSpy).toBeCalledTimes(1);
    expect(redisSetSpy).toBeCalledTimes(1);
  });
});

describe('Signup basic route', () => {
  const endpoint = '/v1/signup/basic';
  const request = supertest(app);

  const code: number = 123456;

  beforeEach(() => {
    mockUserFindById.mockClear();
    redisGetSpy.mockClear();
    bcryptHashSpy.mockClear();
    mockUserCreate.mockClear();
  });

  it('Should send error when empty body is sent', async () => {
    const response = await addHeaders(request.post(endpoint));
    expect(response.status).toBe(400);
    expect(mockUserFindById).not.toBeCalled();
    expect(redisGetSpy).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
  });

  it('Should send error when empty id is sent', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        permission: PERMISSION,
        nickname: USER_NICKNAME,
        password: USER_PASSWORD,
        phonenumber: USER_PHONENUMBER2,
        code: 123456,
      }),
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/id/);
    expect(response.body.message).toMatch(/required/);
    expect(mockUserFindById).not.toBeCalled();
    expect(redisGetSpy).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
  });

  it('Should send error when empty permission is sent', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        id: TEST_ID,
        nickname: USER_NICKNAME,
        password: USER_PASSWORD,
        phonenumber: USER_PHONENUMBER2,
        code: 123456,
      }),
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/permission/);
    expect(response.body.message).toMatch(/required/);
    expect(mockUserFindById).not.toBeCalled();
    expect(redisGetSpy).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
  });

  it('Should send error when empty nickname is sent', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        id: TEST_ID,
        permission: PERMISSION,
        password: USER_PASSWORD,
        phonenumber: USER_PHONENUMBER2,
        code: 123456,
      }),
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/nickname/);
    expect(response.body.message).toMatch(/required/);
    expect(mockUserFindById).not.toBeCalled();
    expect(redisGetSpy).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
  });

  it('Should send error when empty password is sent', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        id: TEST_ID,
        permission: PERMISSION,
        nickname: USER_NICKNAME,
        phonenumber: USER_PHONENUMBER2,
        code: 123456,
      }),
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/password/);
    expect(response.body.message).toMatch(/required/);
    expect(mockUserFindById).not.toBeCalled();
    expect(redisGetSpy).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
  });

  it('Should send error when empty phonenumber is sent', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        id: TEST_ID,
        permission: PERMISSION,
        nickname: USER_NICKNAME,
        password: USER_PASSWORD,
        code: 123456,
      }),
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/phonenumber/);
    expect(response.body.message).toMatch(/required/);
    expect(mockUserFindById).not.toBeCalled();
    expect(redisGetSpy).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
  });

  it('Should send error when empty code is sent', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        id: TEST_ID,
        permission: PERMISSION,
        nickname: USER_NICKNAME,
        password: USER_PASSWORD,
        phonenumber: USER_PHONENUMBER2,
      }),
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/code/);
    expect(response.body.message).toMatch(/required/);
    expect(mockUserFindById).not.toBeCalled();
    expect(redisGetSpy).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
  });

  it('Should send error when user is registered for email', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        id: USER_ID,
        permission: PERMISSION,
        nickname: USER_NICKNAME,
        password: USER_PASSWORD,
        phonenumber: USER_PHONENUMBER2,
        code: 123456,
      }),
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/already registered/);
    expect(mockUserFindById).toBeCalledTimes(1);
    expect(redisGetSpy).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
  });

  it('Should send success response for correct data', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        id: TEST_ID,
        permission: PERMISSION,
        nickname: USER_NICKNAME,
        password: USER_PASSWORD,
        phonenumber: USER_PHONENUMBER2,
        code: code,
      }),
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/Success/i);
    expect(response.body.data).toBeDefined();

    expect(response.body.data.user).toHaveProperty('id');
    expect(response.body.data.user).toHaveProperty('permission');
    expect(response.body.data.user).toHaveProperty('nickname');
    expect(response.body.data.user).toHaveProperty('phonenumber');

    expect(mockUserFindById).toBeCalledTimes(1);
    expect(redisGetSpy).toBeCalledTimes(1);
    expect(bcryptHashSpy).toBeCalledTimes(1);
    expect(mockUserCreate).toBeCalledTimes(1);

    expect(redisGetSpy).toBeCalledWith(USER_PHONENUMBER2);
    expect(bcryptHashSpy).toBeCalledWith(USER_PASSWORD, 10);
  });
});
