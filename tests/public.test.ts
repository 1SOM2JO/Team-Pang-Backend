import app from '../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('Test public routes', () => {
  it("should respond with a 200 response and a 'Hello World' body in / route", async () => {
    const response = await request.get('/').set('x-api-key', 'abc');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello World');
  });
});