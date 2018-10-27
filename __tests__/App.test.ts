import * as request from 'supertest';
import app from '../src/App';

describe('App', () => {
  it('should return a 200 status on /', async () => {
    const result = await request(app).get('/');
    expect(result.status).toEqual(200);
  });
});
