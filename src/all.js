const fetchDepartedEmployees = require('./utils/fetchDepartedEmployees');

const main = async () => {
    const departedEmployees = await fetchDepartedEmployees();

    console.log('All Departed Employees: ', departedEmployees);
};

main().catch(e => {
    console.error(e);
});
