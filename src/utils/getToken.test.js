const getToken = require("./getToken");

describe("getToken()", () => {
  test("returns environment variable", () => {
    process.env.TOKEN = "123abc";
    expect(getToken()).toBe("123abc");
  });
});
