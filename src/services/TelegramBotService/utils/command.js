const { CommandName } = require('../constants/customCommands');

module.exports.getCommandName = (text) => {
  const textArray = text.split(' ');

  const commandName = textArray[0].replace('/', '');

  return commandName;
};

module.exports.getCustomCommandName = (text) => {
  if (!text.startsWith('/')) return false;

  const textArray = text.split(' ');

  const commandName = textArray[0].replace('/', '');

  const commandNameArray = Object.keys(CommandName).map(key => CommandName[key]);

  const command = commandNameArray.find(x => x === commandName);

  return command;
};
