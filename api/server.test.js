// Write your tests here
const Users = require('./auth/auth-model');
const db = require('../data/dbConfig');
const request = require('supertest');
const server = require('./server');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('users').truncate();
});

test('sanity', () => {
  expect(true).toBe(true)
})

test('verify we are using the correct environment', ()  => {
  expect(process.env.NODE_ENV).toBe('testing');
});

describe('test add', () => {
    test('add creates new user', async () => {
      await Users.add({"username": "testname", "password": "1234"})
      let result = await Users.find()
      expect(result).toHaveLength(1)
    })
    test('add responds with newly created user info', async () => {
      let result = await Users.add({"username": "testname", "password": "1234"})
      expect(result).toBeTruthy()
      expect(result.username).toBe('testname')
      expect(result.id).toBe(1)

      // expect(result).toHaveProperty("password", "1234")
    })
})
