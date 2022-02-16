const connectDatabase = require("../src/loaders/database");
const { api } = require("../src/config");
const { server, initialUsers } = require("./helpers");
const User = require("../src/models/User");

describe("LOCATIONS", () => {
  test("HEADERS", async () => {
    await server
      .get(`${api.prefix}/search/Buenos%20Aires`)
      .expect("Content-Type", /application\/json/)
      .expect(201);
  });
  test("BODY", async () => {});
});
