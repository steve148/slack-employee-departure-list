const axios = require('axios');
const moment = require('moment');
const { orderBy, differenceWith, isEqual } = require('lodash');
const fs = require('fs');
const os = require('os');

const { TOKEN } = process.env;

const STATE_FILENAME = 'state.json';

const getState = () => {
    try {
        return JSON.parse(fs.readFileSync(STATE_FILENAME));
    } catch (e) {
        return [];
    }
};

const setState = state => {
    fs.writeFileSync(STATE_FILENAME, JSON.stringify(state, null, 4) + os.EOL);
};

const fetchAllDepartedEmployees = async () => {
    const response = await axios.get('https://slack.com/api/users.list', {
        params: { token: TOKEN },
    });

    const { members } = response.data;

    const deletedMembers = members.filter(
        ({ deleted, is_bot: isBot }) => deleted && !isBot
    );

    const sortedDeletedMembers = orderBy(deletedMembers, ['updated'], ['asc']);

    return sortedDeletedMembers.map(({ name, updated }) => ({
        name,
        updated: moment.unix(updated).format('dddd, MMMM Do YYYY, h:mm:ss a'),
    }));
};

const listRecentlyDepartedEmployees = (
    departedEmployees,
    previouslyDepartedEmployees
) => differenceWith(departedEmployees, previouslyDepartedEmployees, isEqual);

const main = async () => {
    const pastState = getState();

    const departedEmployees = await fetchAllDepartedEmployees();

    console.log(
        'Recently Departed Employees: ',
        listRecentlyDepartedEmployees(departedEmployees, pastState)
    );

    setState(departedEmployees);
};

main().catch(e => {
    console.error(e);
});
