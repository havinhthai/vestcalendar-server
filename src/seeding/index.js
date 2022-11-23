const Listr = require('listr');
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

const fakeAdministrators = require('./fakeAdministrators');
const fakeCategory = require('./fakeCategory');
const fakeItem = require('./fakeItem');
const fakeRarity = require('./fakeRarity');
const fakeUser = require('./fakeUser');
const fakeOrder = require('./fakeOrder');
const fakeProject = require('./fakeProject');

const destroyDB = () => ([
  {
    title: 'Remove All Collections in Database',
    task: async () => {
      await mongoose.connection.dropDatabase();
    },
  },
]);

const pumpItUp = () => ([
  ...destroyDB(),
  ...[
    {
      title: 'Create data simple for Administrator model 📺 👌',
      task: async () => {
        await fakeAdministrators();
      },
    },
    // {
    //   title: 'Create data simple for User model 📺 👌',
    //   task: async () => {
    //     await fakeUser();
    //   },
    // },
    // {
    //   title: 'Create data simple for category model 📺 👌',
    //   task: async () => {
    //     await fakeCategory();
    //   },
    // },
    // {
    //   title: 'Create data simple for rarity model 📺 👌',
    //   task: async () => {
    //     await fakeRarity();
    //   },
    // },
    // {
    //   title: 'Create data simple for item model 📺 👌',
    //   task: async () => {
    //     await fakeItem();
    //   },
    // },
    // {
    //   title: 'Create data simple for order model 📺 👌',
    //   task: async () => {
    //     await fakeOrder();
    //   },
    // },
    {
      title: 'Create data simple for project model 📺 👌',
      task: async () => {
        await fakeProject();
      },
    },
  ],
]);

async function kickoff(tasks) {
  await tasks.run();
  process.exit();
}

if (process.argv.includes('--destroy')) {
  const cleanUp = destroyDB();
  kickoff(new Listr(cleanUp));
} else {
  const pumpIt = pumpItUp();
  kickoff(new Listr(pumpIt));
}
