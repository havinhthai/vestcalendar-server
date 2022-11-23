const fs = require('fs');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  autoIndex: false,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
  if (err) {
    throw new Error(`Unable to connect to database: ${err.toString()}`);
  }
});

const app = require('./config/express');
const helpers = require('./src/helpers');

const TelegramBotService = require('./src/services/TelegramBotService');

if (process.env.NODE_ENV === 'production') {
  const dir = './logs';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  app.use(morgan('combined', {
    stream: fs.createWriteStream(`${__dirname}/logs/access.log`, { flags: 'a' }),
  }));
} else {
  app.use(morgan('dev'));
}

const routes = require('./src/modules/routes');

app.use('/admin', (req, res, next) => {
  res.locals.formatDate = helpers.formatDate;
  res.locals.truncateText = helpers.truncateText;
  res.locals.formatDateTimeInput = helpers.formatDateTimeInput;

  res.locals.flash_messages = req.session.flash;
  delete req.session.flash;

  next();
});

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw new Error(`Unable to list to port: ${err.toString()}`);
  }

  console.info(`🚀 Server running on http://${process.env.HOST}:${PORT}`);
});

new TelegramBotService().run();
