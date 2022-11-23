const { CATEGORY_TYPES } = require('../constants');
const { Category, AssetType } = require('../models');

const categories = [
  {
    name: CATEGORY_TYPES.CATEGORY_TYPE_WEARABLE,
    slug: 'wearables',
    categories: [
      {
        _id: 1,
        name: 'Head',
        slug: 'head',
        assetTypes: [
          { _id: 1, name: 'Hat', slug: 'hat' },
          { _id: 2, name: 'Mask', slug: 'mask' },
          { _id: 3, name: 'Hair', slug: 'hair' },
          { _id: 4, name: 'Emotion', slug: 'emotion' },
          { _id: 5, name: 'Glasses', slug: 'glasses' },
          { _id: 6, name: 'Headphone', slug: 'headphone' },
          { _id: 7, name: 'MiniPet', slug: 'mini-pet' },
          { _id: 8, name: 'Others', slug: 'others' },
        ],
      },
      {
        _id: 2,
        name: 'Arms',
        slug: 'arms',
        assetTypes: [
          { _id: 1, name: 'Hand', slug: 'hand' },
          { _id: 2, name: 'Shoulder', slug: 'shoulder' },
          { _id: 3, name: 'Gloves', slug: 'gloves' },
          { _id: 4, name: 'Bracelet', slug: 'bracelet' },
          { _id: 5, name: 'Others', slug: 'others' },
        ],
      },
      {
        _id: 3,
        name: 'Back',
        slug: 'back',
        assetTypes: [
          { _id: 1, name: 'Wings', slug: 'wings' },
          { _id: 2, name: 'Jetpack', slug: 'jetpack' },
          { _id: 3, name: 'Backpack', slug: 'backpack' },
          { _id: 4, name: 'Chestplate', slug: 'chestplate' },
          { _id: 5, name: 'Others', slug: 'others' },
        ],
      },
      {
        _id: 4,
        name: 'Skin',
        slug: 'skin',
        assetTypes: [],
      },
    ],
  },
  {
    name: CATEGORY_TYPES.CATEGORY_TYPE_PET,
    slug: 'pet',
    categories: [
      {
        _id: 5,
        name: 'Following',
        slug: 'Following',
        assetTypes: [],
      },
      {
        _id: 6,
        name: 'Mount',
        slug: 'mount',
        assetTypes: [
          { _id: 1, name: 'Riding', slug: 'riding' },
          { _id: 2, name: 'Driving', slug: 'driving' },
          { _id: 3, name: 'Flying', slug: 'flying' },
          { _id: 4, name: 'Surfing', slug: 'surfing' },
        ],
      },
      {
        _id: 7,
        name: 'Others',
        slug: 'others',
        assetTypes: [],
      },
    ],
  },
  {
    name: CATEGORY_TYPES.CATEGORY_TYPE_CONSTRUCTS,
    slug: 'constructs',
    categories: [
      {
        _id: 8,
        name: 'Building',
        slug: 'building',
        assetTypes: [],
      },
      {
        _id: 9,
        name: 'Furnitures & Arts',
        slug: 'furnitures-arts',
        assetTypes: [],
      },
      {
        _id: 10,
        name: 'Others',
        slug: 'others',
        assetTypes: [],
      },
    ],
  },
];

const fakeCategory = async () => {
  try {
    for (let i = 0; i < categories.length; i += 1) {
      if (categories[i].categories.length) {
        for (let o = 0; o < categories[i].categories.length; o += 1) {
          // const assetTypesIds = [];
          // if (categories[i].categories[o].assetTypes.length) {
          //   for (let j = 0; j < categories[i].categories[o].assetTypes.length; j += 1) {
          //     // eslint-disable-next-line no-await-in-loop
          //     const asset = await AssetType.create({
          //       name: categories[i].categories[o].assetTypes[j].name,
          //       slug: categories[i].categories[o].assetTypes[j].slug,
          //     });

          //     assetTypesIds.push(asset._id);
          //   }
          // }
          // eslint-disable-next-line no-await-in-loop
          await Category.create({
            name: categories[i].categories[o].name,
            slug: categories[i].categories[o].slug,
            position: o,
            isPublished: true,
            type: categories[i].name,
            // assets: assetTypesIds,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = fakeCategory;
