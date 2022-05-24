import app from '../app';
import {port} from '../configs/config';
import request from 'supertest';

let server;
beforeEach(async () => {
  server = app.listen(port);
});

afterEach(async () => {
  server.close();
});

it('should be no query params for "/conforme"', async () => {
  const response = await request(app).get('/conforme');
  expect(response.statusCode).toBe(400);

  const expectedBody = {
    errors: [
      {
        msg: 'longitude precisa ser um número real',
        param: 'longitude',
        location: 'query',
      },
      {
        msg: 'latitude precisa ser um número real',
        param: 'latitude',
        location: 'query',
      },
      {
        msg: 'documento precisa ter 11 ou 14 caracteres numéricos',
        param: 'documento',
        location: 'query',
      },
      {
        msg: 'documento precisa ter apenas caracteres numéricos',
        param: 'documento',
        location: 'query',
      },
    ],
  };
  expect(response.body).toStrictEqual(expectedBody);
});

it('query params of "/conforme" should be ok', async () => {
  const response = await request(app).get(
    '/conforme?longitude=0&latitude=0&documento=00000000000'
  );

  expect(response.statusCode).toBe(200);

  const expectedBody = {
    inconformidade: {
      tipos: [],
      nomes: [],
    },
  };
  expect(response.body).toEqual(expectedBody);
});

it('should be no query params for "/conforme/point"', async () => {
  const response = await request(app).get('/conforme/point');
  expect(response.statusCode).toBe(400);

  const expectedBody = {
    errors: [
      {
        msg: 'longitude precisa ser um número real',
        param: 'longitude',
        location: 'query',
      },
      {
        msg: 'latitude precisa ser um número real',
        param: 'latitude',
        location: 'query',
      },
    ],
  };
  expect(response.body).toStrictEqual(expectedBody);
});

it('query params of "/conforme/point" should be ok', async () => {
  const response = await request(app).get(
    '/conforme/point?longitude=0&latitude=0'
  );

  expect(response.statusCode).toBe(200);

  const expectedBody = {
    inconformidade: {
      tipos: [],
      nomes: [],
    },
  };
  expect(response.body).toEqual(expectedBody);
});
