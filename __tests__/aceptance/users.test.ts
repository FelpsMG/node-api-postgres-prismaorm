import * as request from 'supertest';
import app from "../../src/app";
import { port } from '../../src/config';
import {expect, jest} from '@jest/globals';
import { DataSource } from 'typeorm';

let connection, server;

const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    age: 20,
};

beforeEach(async () => {
    connection = await new DataSource(require("../ormconfig.json")).initialize();
    await connection.synchronize();

    server = app.listen(port)
})

afterEach(async () => {
    connection.close()
    server.close()
})

// it('should be no users initially', async () => {
//     const response = await request(app).get('/users');
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual([]);
// });

// it('should create a user', async () => {
//     const response = await request(app).post('/users').send(testUser);
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual({ ...testUser, id: 1 });
// });

// it('should not create a user if no firstName is given', async () => {
//     const response = await request(app).post('/users').send({ lastName: 'Doe', age: 21 });
//     expect(response.statusCode).toBe(400);
//     expect(response.body.errors).not.toBeNull();
//     expect(response.body.errors.length).toBe(1);
//     expect(response.body.errors[0]).toEqual({
//         msg: 'Invalid value', param: 'firstName', location: 'body'
//     });
// });

// it('should not create a user if age is less than 0', async () => {
//     const response = await request(app).post('/users').send({ firstName: 'John', lastName: 'Doe', age: -1 });
//     expect(response.statusCode).toBe(400);
//     expect(response.body.errors).not.toBeNull();
//     expect(response.body.errors.length).toBe(1);
//     expect(response.body.errors[0]).toEqual({
//         msg: 'age must be a positive integer', param: 'age', value: -1, location: 'body',
//     });
// });


//este arquivo realiza testes de funcionamento ao longo do código gerado para a rest api
// npm i --save-dev jest supertest
// npm i --save-dev @types/jest