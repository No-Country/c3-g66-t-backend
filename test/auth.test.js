const connectDatabase = require("../src/loaders/database");
const { api } = require("../src/config");
const { server, initialUsers } = require("./helpers");
const User = require("../src/models/User");

let connection;

beforeAll(async () => {
  connection = await connectDatabase();
});
afterEach(async () => {
  await User.deleteMany();
});
afterAll(() => {
  connection.disconnect();
});

describe("REGISTER", () => {
  test("HEADERS", async () => {
    await server
      .post(`${api.prefix}/auth/register`)
      .send(initialUsers[0])
      .expect("Content-Type", /application\/json/)
      .expect(201);
  });
  test("BODY", async () => {
    const res = await server
      .post(`${api.prefix}/auth/register`)
      .send(initialUsers[0]);
    expect(res.body.data.firstname).toBe("John");
    expect(res.body.data.lastname).toBe("Doe");
    expect(res.body.data.dni).toBe("12345678");
    expect(res.body.data.email).toBe("john@doe.com");
    expect(res.body.data.phone).toBe("+541101234567");
    expect(res.body.data.img).toBe(
      "https://i.blogs.es/b54943/god1/840_560.jpg"
    );
    expect(res.body.data.password).not.toBeDefined();
    expect(res.body.data.token).toBeDefined();
  });
});

describe("LOGIN", () => {
  test("HEADERS", async () => {
    await server.post(`${api.prefix}/auth/register`).send(initialUsers[0]);
    const { email, password } = initialUsers[0];
    await server
      .post(`${api.prefix}/auth/login`)
      .send({ email, password })
      .expect("Content-Type", /application\/json/)
      .expect(200);
  });

  test("BODY", async () => {
    await server.post(`${api.prefix}/auth/register`).send(initialUsers[0]);
    const { email, password } = initialUsers[0];
    const res = await server
      .post(`${api.prefix}/auth/login`)
      .send({ email, password });
    expect(res.body.data.firstname).toBe("John");
    expect(res.body.data._id).toBeDefined();
    expect(res.body.data.lastname).toBe("Doe");
    expect(res.body.data.dni).toBe("12345678");
    expect(res.body.data.email).toBe("john@doe.com");
    expect(res.body.data.phone).toBe("+541101234567");
    expect(res.body.data.img).toBe(
      "https://i.blogs.es/b54943/god1/840_560.jpg"
    );
    expect(res.body.data.password).not.toBeDefined();
    expect(res.body.data.token).toBeDefined();
  });
});
