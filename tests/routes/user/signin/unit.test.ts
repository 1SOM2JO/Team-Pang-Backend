import {
  addHeaders,
  mockUserKeyUpdate,
  mockUserFindById,
  createTokensSpy,
  bcryptCompareSpy,
  USER_ID,
  USER_PASSWORD,
  USER_PASSWORD_HASH,
} from './mock';

import supertest from 'supertest';
import app from '../../../../src/app';

describe('Login basic route', () => {
  const endpoint = '/user/signin/basic';
  const request = supertest(app);

  beforeEach(() => {
    mockUserKeyUpdate.mockClear();
    mockUserFindById.mockClear();
    bcryptCompareSpy.mockClear();
    createTokensSpy.mockClear();
  });

  it('should send error when empty body is sent', async () => {
    const response = await addHeaders(request.post(endpoint));
    expect(response.status).toBe(400);
    expect(mockUserFindById).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockUserKeyUpdate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it('should send errpr when id is only send', async () => {
    const response = await addHeaders(
      await request.post(endpoint).send({ id: USER_ID }),
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/password/);
    expect(mockUserFindById).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockUserKeyUpdate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it('should send errpr when id password only send', async () => {
    const response = await addHeaders(
      await request.post(endpoint).send({ password: USER_PASSWORD }),
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/id/);
    expect(mockUserFindById).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockUserKeyUpdate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it('Should send error when id is not valid format', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ id: '123' }),
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/id length/);
    expect(mockUserFindById).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockUserKeyUpdate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it('Should send error when id password not valid format', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: 'testtest',
        password: '123',
      }),
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/password length/);
    expect(mockUserFindById).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockUserKeyUpdate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it('Should send error when user not registered for email', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: 'testest',
        password: '123456',
      }),
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/not registered/);
    expect(mockUserFindById).toBeCalledTimes(1);
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockUserKeyUpdate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it('Should send error for wrong password', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: USER_ID,
        password: '123456',
      }),
    );
    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/authentication failure/i);
    expect(mockUserFindById).toBeCalledTimes(1);
    expect(bcryptCompareSpy).toBeCalledTimes(1);
    expect(mockUserKeyUpdate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it('Should send success response for correct credentials', async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: USER_ID,
        password: USER_PASSWORD,
      }),
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/Success/i);
    expect(response.body.data).toBeDefined();

    expect(response.body.data.user).toHaveProperty('uuid');
    expect(response.body.data.user).toHaveProperty('nickname');
    expect(response.body.data.user).toHaveProperty('permission');
    expect(response.body.data.user).toHaveProperty('phonenumber');

    expect(response.body.data.tokens).toBeDefined();
    expect(response.body.data.tokens).toHaveProperty('accessToken');
    expect(response.body.data.tokens).toHaveProperty('refreshToken');

    expect(mockUserFindById).toBeCalledTimes(1);
    expect(bcryptCompareSpy).toBeCalledTimes(1);
    expect(mockUserKeyUpdate).toBeCalledTimes(1);
    expect(createTokensSpy).toBeCalledTimes(1);

    expect(bcryptCompareSpy).toBeCalledWith(USER_PASSWORD, USER_PASSWORD_HASH);
  });
});
