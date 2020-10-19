import app from '../../../src/app';
import supertest from 'supertest';

describe('apikey validation', () => {
  const endpoint = '/v1/dummy/test';
  const request = supertest(app);

  it('Should response with 400 if x-api-key header is not passed', async () => {
    const response = await request.get(endpoint);
    expect(response.status).toBe(400);
  });

  it('Should response with 403 if wrong x-api-key header is passed', async () => {
    const wrongApiKey = '123';
    const response = await request.get(endpoint).set('x-api-key', wrongApiKey);
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Permission denied');
  });

  it('Should response with 404 if correct x-api-key header is passed', async () => {
    const wrongApiKey = 'abc';
    const response = await request.get(endpoint).set('x-api-key', wrongApiKey);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Not Found');
  });
});
