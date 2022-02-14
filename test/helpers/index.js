const supertest = require("supertest");
const server = require("../../src/loaders/express");

const api = supertest(server.app);

const initialUsers = [
  {
    firstname: "John",
    lastname: "Doe",
    dni: "12345678",
    email: "john@doe.com",
    phone: "+541101234567",
    password: "12345678",
    img:"https://i.blogs.es/b54943/god1/840_560.jpg"
  },
];

module.exports = { server: api, initialUsers };
