const { User } = require('../models');

const fakeUser = async () => {
  try {
    for (let i = 0; i < 4; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await User.create({
        name: 'user',
        email: `user${i}@gmail.com`,
        isVerified: true,
        password: 123123123,
        avatar: 'https://avatars.dicebear.com/api/miniavs/0xa631943187d5aae3aaa9ae797328370bc67b9651.png',
        isBlocked: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = fakeUser;
