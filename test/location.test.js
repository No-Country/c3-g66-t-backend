const { api } = require("../src/config");
const { server } = require("./helpers");
const User = require("../src/models/User");

describe("LOCATIONS", () => {
  test("HEADERS", async () => {
    await server
      .get(`${api.prefix}/location/Buenos%20Aires`)
      .expect("Content-Type", /application\/json/)
      .expect(200);
  });
  test("BODY", async () => {
    const res = await server.get(`${api.prefix}/location/Buenos%20Aires`);
    expect(res.body.code).toBe(200);
    expect(res.body.message).toBe("Locations Finded");
    expect(res.body.data[0]).toHaveProperty("place_name");
    expect(res.body.data[0]).toHaveProperty("text");
    expect(res.body.data[0]).toHaveProperty("latitude");
    expect(res.body.data[0]).toHaveProperty("longitude");
    expect(res.body.data[0].place_name).toContain("Buenos Aires");
    expect(res.body.data[0].text).toContain("Buenos Aires");
    expect(res.body.data[0].latitude).toBe(-34.59972);
    expect(res.body.data[0].longitude).toBe(-58.38194);
  });
});
