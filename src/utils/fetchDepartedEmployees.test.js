const axios = require("axios");

const fetchDepartedEmployees = require("./fetchDepartedEmployees");

jest.mock("axios");

describe("fetchDepartedEmployees()", () => {
  test("returns empty array if no users in slack workspace", async () => {
    axios.get.mockResolvedValue({
      data: { members: [], response_metadata: {} },
    });
    const departedEmployees = await fetchDepartedEmployees();

    expect(departedEmployees).toEqual([]);
  });

  test("returns users who have been deleted from slack workspace", async () => {
    axios.get.mockResolvedValue({
      data: {
        members: [
          {
            name: "Michael Bolton",
            deleted: true,
            updated: new Date(1999, 2, 19).getTime() / 1000,
          },
        ],
        response_metadata: {},
      },
    });
    const departedEmployees = await fetchDepartedEmployees();

    expect(departedEmployees).toEqual([
      { name: "Michael Bolton", updated: new Date(1999, 2, 19).toISOString() },
    ]);
  });

  test("filters out users who are bots", async () => {
    axios.get.mockResolvedValue({
      data: {
        members: [
          {
            name: "Michael Bolton",
            deleted: true,
            updated: new Date(1999, 2, 19).getTime() / 1000,
            is_bot: true,
          },
        ],
        response_metadata: {},
      },
    });
    const departedEmployees = await fetchDepartedEmployees();

    expect(departedEmployees).toEqual([]);
  });

  test("sorts departed users by when they were last updated in ascending order", async () => {
    axios.get.mockResolvedValue({
      data: {
        members: [
          {
            name: "Samir Nagheenanajar",
            deleted: true,
            updated: new Date(1999, 2, 20).getTime() / 1000,
          },
          {
            name: "Michael Bolton",
            deleted: true,
            updated: new Date(1999, 2, 19).getTime() / 1000,
          },
        ],
        response_metadata: {},
      },
    });
    const departedEmployees = await fetchDepartedEmployees();

    expect(departedEmployees).toEqual([
      { name: "Michael Bolton", updated: new Date(1999, 2, 19).toISOString() },
      {
        name: "Samir Nagheenanajar",
        updated: new Date(1999, 2, 20).toISOString(),
      },
    ]);
  });

  test("fetches all pages of employees", async () => {
    axios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            members: [
              {
                name: "Samir Nagheenanajar",
                deleted: true,
                updated: new Date(1999, 2, 20).getTime() / 1000,
              },
            ],
            response_metadata: { next_cursor: "some-cursor" },
          },
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            members: [
              {
                name: "Michael Bolton",
                deleted: true,
                updated: new Date(1999, 2, 19).getTime() / 1000,
              },
            ],
            response_metadata: {},
          },
        })
      );

    const departedEmployees = await fetchDepartedEmployees();
    expect(departedEmployees).toEqual([
      { name: "Michael Bolton", updated: new Date(1999, 2, 19).toISOString() },
      {
        name: "Samir Nagheenanajar",
        updated: new Date(1999, 2, 20).toISOString(),
      },
    ]);
  });
});
