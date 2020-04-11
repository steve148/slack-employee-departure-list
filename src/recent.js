const { differenceWith, isEqual } = require("lodash");
const fs = require("fs");
const os = require("os");

const fetchDepartedEmployees = require("./utils/fetchDepartedEmployees");

const STATE_FILENAME = "state.json";

const getState = () => {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILENAME));
  } catch (e) {
    return [];
  }
};

const setState = (state) => {
  fs.writeFileSync(STATE_FILENAME, JSON.stringify(state, null, 4) + os.EOL);
};

const listRecentlyDepartedEmployees = (
  departedEmployees,
  previouslyDepartedEmployees
) => differenceWith(departedEmployees, previouslyDepartedEmployees, isEqual);

const main = async () => {
  const pastState = getState();

  const departedEmployees = await fetchDepartedEmployees();

  console.log(
    "Recently Departed Employees: ",
    listRecentlyDepartedEmployees(departedEmployees, pastState)
  );

  setState(departedEmployees);
};

main().catch((e) => {
  console.error(e);
});
