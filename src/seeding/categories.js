module.exports = [
  // Construction
  {
    id: 'cat-1',
    name: 'Construction',
    slug: 'construction',
    icon: `${process.env.DOMAIN}/public/client/img/construction.svg`,
    subCategories: [
      {
        id: 'scat-1',
        name: 'Domes',
        slug: 'domes',
      },
      {
        id: 'scat-2',
        name: 'Cubes',
        slug: 'cubes',
      },
      {
        id: 'scat-3',
        name: 'Modules',
        slug: 'modules',
        attributes: [
          {
            name: 'Material',
            slug: 'material',
            values: [
              {
                label: 'Plastic',
                value: 'plastic',
              },
              {
                label: 'Iron',
                value: 'iron',
              },
              {
                label: 'Platinum',
                value: 'platinum',
              },
              {
                label: 'Steel',
                value: 'steel',
              },
              {
                label: 'Fiberglass',
                value: 'fiberglass',
              },
              {
                label: 'Brass',
                value: 'brass',
              },
              {
                label: 'Titanium',
                value: 'titanium',
              },
              {
                label: 'Maranium',
                value: 'maranium',
              },
              {
                label: 'Clay',
                value: 'clay',
              },
              {
                label: 'Stone',
                value: 'stone',
              },
              {
                label: 'Glass',
                value: 'glass',
              },
              {
                label: 'Gems',
                value: 'gems',
              },
            ],
          },
        ],
      },
    ],
    attributes: [],
  },

  // Apparel
  {
    id: 'cat-2',
    name: 'Apparel',
    slug: 'apparel',
    icon: `${process.env.DOMAIN}/public/client/img/apparel.svg`,
    subCategories: [
      {
        id: 'scat-4',
        name: 'Helmet',
        slug: 'helmet',
        attributes: [],
      },
      {
        id: 'scat-5',
        name: 'Jumpsuit',
        slug: 'jumpsuit',
        attributes: [],
      },
      {
        id: 'scat-6',
        name: 'Chest Cover',
        slug: 'chest-cover',
        attributes: [],
      },
      {
        id: 'scat-7',
        name: 'Shirt',
        slug: 'shirt',
        attributes: [],
      },
      {
        id: 'scat-8',
        name: 'Pant',
        slug: 'pant',
        attributes: [],
      },
      {
        id: 'scat-9',
        name: 'Boots',
        slug: 'boots',
        attributes: [],
      },
      {
        id: 'scat-10',
        name: 'Gloves',
        slug: 'gloves',
        attributes: [],
      },
      {
        id: 'scat-11',
        name: 'Fashion',
        slug: 'fashion',
        attributes: [],
      },
    ],
    attributes: [
      {
        name: 'Class',
        slug: 'class',
        values: [
          {
            label: 'Basic',
            value: 'basic',
          },
          {
            label: 'Pioneer',
            value: 'pioneer',
          },
          {
            label: 'Academy',
            value: 'academy',
          },
          {
            label: 'Elite',
            value: 'elite',
          },
          {
            label: 'First Class',
            value: 'first-class',
          },
          {
            label: 'Master Class',
            value: 'master-class',
          },
        ],
      },
      {
        name: 'Gender',
        slug: 'gender',
        values: [
          {
            label: 'Male',
            value: 'male',
          },
          {
            label: 'Female',
            value: 'female',
          },
          {
            label: 'Unisex',
            value: 'unisex',
          },
        ],
      },
    ],
  },

  // Technology
  {
    id: 'cat-3',
    name: 'Technology',
    slug: 'technology',
    icon: `${process.env.DOMAIN}/public/client/img/technology.svg`,
    subCategories: [
      {
        id: 'scat-13',
        name: 'Upper rover',
        slug: 'upper-rover',
        attributes: [],
      },
      {
        id: 'scat-14',
        name: 'Lower rover',
        slug: 'lower-rover',
        attributes: [],
      },
      {
        id: 'scat-15',
        name: 'Exo skeleton',
        slug: 'exo-skeleton',
        attributes: [],
      },
      {
        id: 'scat-16',
        name: 'PLSS',
        slug: 'plss',
      },
    ],
    attributes: [],
  },

  // Farming
  {
    id: 'cat-4',
    name: 'Farming',
    slug: 'farming',
    icon: `${process.env.DOMAIN}/public/client/img/farming.svg`,
    subCategories: [
      {
        id: 'scat-17',
        name: 'Farming tools',
        slug: 'farming-tools',
        attributes: [],
      },
      {
        id: 'scat-18',
        name: 'Seeds',
        slug: 'seeds',
        attributes: [],
      },
    ],
    attributes: [],
  },

  // Mining
  {
    id: 'cat-5',
    name: 'Mining',
    slug: 'mining',
    icon: `${process.env.DOMAIN}/public/client/img/mining.svg`,
    subCategories: [
      {
        id: 'scat-19',
        name: 'Mining tools',
        slug: 'mining-tools',
        attributes: [],
      },
      {
        id: 'scat-20',
        name: 'Ores',
        slug: 'ores',
        attributes: [],
      },
      {
        id: 'scat-21',
        name: 'Gems',
        slug: 'gems',
        attributes: [],
      },
      {
        id: 'scat-22',
        name: 'Refined Material',
        slug: 'refined-material',
        attributes: [],
      },
    ],
    attributes: [],
  },

  // Cooking
  {
    id: 'cat-6',
    name: 'Cooking',
    slug: 'cooking',
    icon: `${process.env.DOMAIN}/public/client/img/cooking.svg`,
    subCategories: [
      {
        id: 'scat-23',
        name: 'Cookwares',
        slug: 'cookwares',
        attributes: [],
      },
      {
        id: 'scat-24',
        name: 'Ingredients',
        slug: 'ingredients',
        attributes: [],
      },
    ],
    attributes: [],
  },

  // Consumable
  {
    id: 'cat-7',
    name: 'Consumable',
    slug: 'consumable',
    icon: `${process.env.DOMAIN}/public/client/img/consumable.svg`,
    subCategories: [],
    attributes: [],
  },

  // Miscellaneous
  {
    id: 'cat-8',
    name: 'Miscellaneous',
    slug: 'miscellaneous',
    icon: `${process.env.DOMAIN}/public/client/img/miscellaneous.svg`,
    subCategories: [],
    attributes: [],
  },

  // Specials
  {
    id: 'cat-9',
    name: 'Specials',
    slug: 'specials',
    icon: `${process.env.DOMAIN}/public/client/img/specials.svg`,
    subCategories: [
      {
        id: 'scat-25',
        name: 'Supply crates',
        slug: 'supply-crates',
        attributes: [],
      },
    ],
    attributes: [],
  },
];
