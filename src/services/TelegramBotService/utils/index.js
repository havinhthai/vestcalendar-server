module.exports.Bot = require('./bot');
module.exports.Chat = require('./chat');
module.exports.Command = require('./command');

module.exports.log = (message) => {
  const { APP_NAME } = process.env;

  console.log(`[${APP_NAME}] ${message}`);
};

module.exports.capitalizeFirstLetter = string => (
  string.charAt(0).toUpperCase() + string.slice(1)
);
