const { Administrator, Role } = require('../models');

const fakeAdministrators = async () => {
  try {
    const rootRole = await Role.create({
      name: 'Root',
      description: 'Root',
      isRoot: true,
    });

    await Administrator.create({
      firstName: 'VestCalendar',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      password: 2,
      role: rootRole._id,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = fakeAdministrators;
