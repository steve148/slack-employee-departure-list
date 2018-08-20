const axios = require('axios');
const moment = require('moment');
const { orderBy } = require('lodash');

const { TOKEN } = process.env;

const main = async () => {
  const response = await axios.get('https://slack.com/api/users.list', {
    params: { token: TOKEN },
  });

  const { members } = response.data;

  const deletedMembers = members.filter(({ deleted, is_bot: isBot }) => deleted && !isBot);

  const sortedDeletedMembers = orderBy(deletedMembers, ['updated'], ['desc']);

  const output = sortedDeletedMembers.map(({ name, updated }) => ({
    name,
    updated: moment.unix(updated).format('dddd, MMMM Do YYYY, h:mm:ss a'),
  }));

  console.log(output);
};

main().catch((e) => {
  console.error(e);
});
