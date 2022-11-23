const { Rarity } = require('../models');

const rarities = [
  {
    _id: 1,
    name: 'Common',
    slug: 'common',
    maxItem: 20000,
  },
  {
    _id: 2,
    name: 'Uncommon',
    slug: 'uncommon',
    maxItem: 10000,
  },
  {
    _id: 3,
    name: 'Rare',
    slug: 'rare',
    maxItem: 3000,
  },
  {
    _id: 4,
    name: 'Epic',
    slug: 'epic',
    maxItem: 1000,
  },
  {
    _id: 5,
    name: 'Legendary',
    slug: 'legendary',
    maxItem: 100,
  },
  {
    _id: 6,
    name: 'Mythical',
    slug: 'mythical',
    maxItem: 10,
  },
  {
    _id: 7,
    name: 'Event',
    slug: 'event',
    maxItem: -1,
  },
  {
    _id: 8,
    name: 'Unique',
    slug: 'Unique',
    maxItem: 1,
  },
];

const fakeRarity = async () => {
  try {
    for (let i = 0; i < rarities.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await Rarity.create({
        name: rarities[i].name,
        slug: rarities[i].slug,
        maxItem: rarities[i].maxItem,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = fakeRarity;
