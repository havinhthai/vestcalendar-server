module.exports.generateHelpMessage = (commands = []) => {
  let responseMessage = 'Bot có thể giúp bạn bằng các lệnh bên dưới:\n\n';

  commands.forEach((item, index) => {
    responseMessage += `/${item.command} - ${item.description}\n`;

    const nextItem = commands[index + 1];

    if (nextItem && nextItem.group !== item.group) {
      responseMessage += '\n';
    }
  });

  return responseMessage;
};

module.exports.getUserFullName = (fromUser) => {
  if (fromUser.first_name && fromUser.last_name) {
    return `${fromUser.first_name} ${fromUser.last_name}`;
  }

  if (fromUser.first_name) {
    return fromUser.first_name;
  }

  return fromUser.last_name;
};

module.exports.isMatchUser = (fromUser, name) => {
  const fullname = module.exports.getUserFullName(fromUser);

  return name === fullname;
};

module.exports.escapeMarkdownCharacters = string => string
  .replace(/[\\(\\)#.]/gm, m => `\\${m}`)
  .replace(/_/gmi, '\\_')
  .replace(/\[/gmi, '\\[');
