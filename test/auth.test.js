const connectDatabase = require("../src/loaders/database");
const { api } = require("../src/config");
const { server, initialUsers } = require("./helpers");
const User = require("../src/models/User");

let connection;

beforeAll(async () => {
  connection = await connectDatabase();
  console.log(process.env.NODE_ENV);
});
afterEach(async () => {
  await User.deleteMany();
});
afterAll(() => {
  connection.disconnect();
});

describe("USER AUTH/REGISTER", () => {
  test("headers", async () => {
    await server
      .post(`${api.prefix}/auth/register`)
      .send(initialUsers[0])
      .expect("Content-Type", /application\/json/)
      .expect(201);
  });
  test("body", async () => {
    const res = await server.post(`${api.prefix}/auth/register`);
    expect(res.body.data.firstname).toContain("John");
    expect(res.body.data.lastname).toContain("Doe");
    expect(res.body.data.dni).toContain(12345678);
    expect(res.body.data.email).toContain("john@doe.com");
    expect(res.body.data.phone).toContain("+541101234567");
  });
});
