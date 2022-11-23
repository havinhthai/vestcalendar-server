/* eslint-disable no-await-in-loop */
// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const { ITEM_STATUS } = require('../constants');
const {
  Item, User, Rarity, Category, Administrator, AssetType,
} = require('../models');

const fakeItem = async () => {
  try {
    const user = await User.findOne({
      email: 'user0@gmail.com',
    }).lean();

    const admin = await Administrator.findOne({
      email: 'admin@gmail.com',
    }).lean();

    const price = [20000, 40000, 50000, 25000, 48000, 5000000, 6000000];

    for (let i = 0; i < 60; i += 1) {
      const rarity = await Rarity.aggregate([]).sample(1);
      const category = await Category.aggregate([]).sample(1);
      const assetType = await AssetType.aggregate([{
        $match: { _id: { $in: category[0].assets } },
      }]).sample(1);

      await Item.create({
        name: faker.name.jobTitle(),
        slug: faker.lorem.slug(),
        description: faker.name.jobDescriptor(),
        image: faker.image.animals(),
        textures: {
          name: faker.name.jobTitle(),
          url: faker.image.abstract(),
        },
        rarity: rarity[0]._id,
        category: category[0]._id,
        assetType: assetType[0]?._id || null,
        file3d: faker.image.animals(),
        quantity: rarity[0].maxItem,
        price: price[Math.floor(Math.random() * price.length)],
        attribute: i,
        createByUser: user._id,
        isOnSale: true,
        status: ITEM_STATUS.ITEM_STATUS_APPROVE,
      });
    }

    for (let i = 0; i < 60; i += 1) {
      const rarity = await Rarity.aggregate([]).sample(1);
      const category = await Category.aggregate([]).sample(1);
      const assetType = await AssetType.aggregate([{
        $match: { _id: { $in: category[0].assets } },
      }]).sample(1);

      await Item.create({
        name: faker.name.jobTitle(),
        slug: faker.lorem.slug(),
        description: faker.name.jobDescriptor(),
        image: faker.image.animals(),
        textures: {
          name: faker.name.jobTitle(),
          url: faker.image.abstract(),
        },
        rarity: rarity[0]._id,
        category: category[0]._id,
        assetType: assetType[0]?._id || null,
        file3d: faker.image.animals(),
        quantity: rarity[0].maxItem,
        price: price[Math.floor(Math.random() * price.length)],
        attribute: i,
        createByAdmin: admin._id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = fakeItem;
