const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const locals = require('ejs-locals');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const methodOverride = require('method-override');
const favicon = require('serve-favicon');

const minifyHTML = require('./minifyHTML');

const app = express();

app.use(cors());

app.engine('ejs', locals);

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(compression());
app.use(helmet());
app.use('/admin', minifyHTML);
// app.use('/admin', favicon('./src/public/admin/favicon.ico'));
app.use('/', favicon('./src/public/admin/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/admin', methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use('/admin', session({
  name: 'vesting-calendar',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: process.env.DB_URL }),
}));

app.use('/admin', flash());

app.use('/public', express.static('./src/public'));

module.exports = app;
