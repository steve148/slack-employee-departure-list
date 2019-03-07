const axios = require('axios');
const { orderBy } = require('lodash');
const moment = require('moment');

const getSlackToken = require('./getToken');

module.exports = async () => {
    const response = await axios.get('https://slack.com/api/users.list', {
        params: { token: getSlackToken() },
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
