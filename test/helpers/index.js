const supertest = require("supertest");
const server = require("../../src/loaders/express");

const api = supertest(server.app);

const initialUsers = [
  {
    firstname: "John",
    lastname: "Doe",
    dni: 12345678,
    email: "john@doe.com",
    phone: "+541101234567",
    password: "12345678",
  },
];

module.exports = { server: api, initialUsers };
