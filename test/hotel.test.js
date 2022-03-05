const connectDatabase = require("../src/loaders/database");
const { api } = require("../src/config");
const { server, initialUsers } = require("./helpers");
const User = require("../src/models/User");

let connection;
let token;

beforeAll(async () => {
  connection = await connectDatabase();
  const res = await server
    .post(`${api.prefix}/auth/register`)
    .send(initialUsers[0]);
  token = res.body.data.token;
});
afterAll(async () => {
  await User.deleteMany();
  connection.disconnect();
});

describe("HOTELS", () => {});
describe("HOTEL BY ID", () => {});
describe("PHOTOS", () => {});
describe("REVIEWS", () => {
  test("CREATE", async () => {
    const res = await server
      .post(`${api.prefix}/hotels/12345/reviews`)
      .set({ Authorization: `Bearer ${token}` })
      .send();
  });
});
