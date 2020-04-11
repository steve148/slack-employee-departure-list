const fetchDepartedEmployees = require("./utils/fetchDepartedEmployees");

const main = async () => {
  const departedEmployees = await fetchDepartedEmployees();

  departedEmployees.forEach((employee) =>
    console.log(JSON.stringify(employee))
  );
};

main().catch((e) => {
  console.error(e);
});
