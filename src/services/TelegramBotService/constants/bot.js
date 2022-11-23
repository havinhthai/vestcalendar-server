const path = require('path');

const CONFIG_FILE = 'bot_config.json';

module.exports.CONFIG_FILE_PATH = path.join(process.env.PWD, CONFIG_FILE);

module.exports.CONFIG_KEY = {
  ACTIVE: 'active',
  DAILY_MESSAGE_OFF_TIME: 'daily_message_off_time',
};
