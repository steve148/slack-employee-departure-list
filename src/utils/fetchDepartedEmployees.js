const axios = require("axios");
const { orderBy } = require("lodash");
const moment = require("moment");

const getSlackToken = require("./getToken");

module.exports = async () => {
  const members = [];
  let cursor = null;

  while (true) {
    const response = await axios.get("https://slack.com/api/users.list", {
      headers: { Authorization: `Bearer ${getSlackToken()}` },
      params: { ...(cursor && { cursor }) },
    });

    members.push(...response.data.members);

    cursor = response.data.response_metadata.next_cursor;

    if (!cursor) {
      break;
    }
  }

  const deletedMembers = members.filter(
    ({ deleted, is_bot: isBot }) => deleted && !isBot
  );

  const sortedDeletedMembers = orderBy(deletedMembers, ["updated"], ["asc"]);

  return sortedDeletedMembers.map(({ name, updated }) => ({
    name,
    updated: moment.unix(updated).toISOString(),
  }));
};
