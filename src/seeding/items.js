const defaultData = {
  contractAddress: '0x0000000000000000000000000000000000000000',
  creator: '0x511906EfA0F6A0E1Ae6D1c996f51db0276D7Cf6f',
  available: 999,
  isOnSale: true,
  price: '9999000000000000000000',
  createdAt: 1637971885000,
  updatedAt: 1639364811000,
  reviewedAt: 1639333264000,
};

module.exports = [
  // Domes
  {
    id: 'item-0',
    itemId: '0',
    name: 'Small Dome',
    description: 'Small Dome',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/16426622425393ri4vi.png',
    image3d: `${process.env.DOMAIN}/public/client/img/3d/Dome_S102_1024.glb`,
    category: {
      name: 'Construction',
      slug: 'construction',
    },
    subCategory: {
      name: 'Domes',
      slug: 'domes',
    },
    ...defaultData,
  },
  {
    id: 'item-1',
    itemId: '1',
    name: 'Small Dome - Advanced',
    description: 'Small Dome - Advanced',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/1640157337522h5x09b.png',
    image3d: `${process.env.DOMAIN}/public/client/img/3d/P001_withoutOpacity.glb`,
    category: {
      name: 'Construction',
      slug: 'construction',
    },
    subCategory: {
      name: 'Domes',
      slug: 'domes',
    },
    ...defaultData,
  },
  {
    id: 'item-2',
    itemId: '2',
    name: 'Medium Dome',
    description: 'Medium Dome',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642662235462sa5yz.png',
    category: {
      name: 'Construction',
      slug: 'construction',
    },
    subCategory: {
      name: 'Domes',
      slug: 'domes',
    },
    ...defaultData,
  },
  {
    id: 'item-3',
    itemId: '3',
    name: 'Medium Dome 2',
    description: 'Medium Dome 2',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/164266223530514e7m.png',
    category: {
      name: 'Construction',
      slug: 'construction',
    },
    subCategory: {
      name: 'Domes',
      slug: 'domes',
    },
    ...defaultData,
  },
  {
    id: 'item-101',
    itemId: '101',
    name: 'Medium Dome 3',
    description: 'Medium Dome 3',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642662495892au9sl.png',
    category: {
      name: 'Construction',
      slug: 'construction',
    },
    subCategory: {
      name: 'Domes',
      slug: 'domes',
    },
    ...defaultData,
  },
  {
    id: 'item-102',
    itemId: '102',
    name: 'Medium Dome 4',
    description: 'Medium Dome 4',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642662495828wk90u.png',
    category: {
      name: 'Construction',
      slug: 'construction',
    },
    subCategory: {
      name: 'Domes',
      slug: 'domes',
    },
    ...defaultData,
  },

  // Cubes
  {
    id: 'item-4',
    itemId: '4',
    name: 'Cube Dome',
    description: 'Cube Dome',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642662711781wkm4ip.png',
    category: {
      name: 'Construction',
      slug: 'construction',
    },
    subCategory: {
      name: 'Cubes',
      slug: 'cubes',
    },
    ...defaultData,
  },

  // Helmet
  {
    id: 'item-5',
    itemId: '5',
    name: 'Enhanced Helmet',
    description: 'Enhanced Helmet',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/1640879921349kzhobo.png',
    image3d: `${process.env.DOMAIN}/public/client/img/3d/DamagedHelmet.gltf`,
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Helmet',
      slug: 'helmet',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Unisex',
      value: 'unisex',
    },
    ...defaultData,
  },
  {
    id: 'item-6',
    itemId: '6',
    name: 'Explore Helmet',
    description: 'Explore Helmet',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/16426628301672mhqct.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Helmet',
      slug: 'helmet',
    },
    class: {
      label: 'Pioneer',
      value: 'pioneer',
    },
    gender: {
      label: 'Unisex',
      value: 'unisex',
    },
    ...defaultData,
  },
  {
    id: 'item-7',
    itemId: '7',
    name: 'Fashionista Helmet',
    description: 'Fashionista Helmet',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642662830161rhi0j5.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Helmet',
      slug: 'helmet',
    },
    class: {
      label: 'Academy',
      value: 'academy',
    },
    gender: {
      label: 'Unisex',
      value: 'unisex',
    },
    ...defaultData,
  },

  // Jumpsuit
  {
    id: 'item-8',
    itemId: '8',
    name: 'Explore Jumpsuit',
    description: 'Explore Jumpsuit',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/1640883019396kx1ozf.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Jumpsuit',
      slug: 'jumpsuit',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Unisex',
      value: 'unisex',
    },
    ...defaultData,
  },
  {
    id: 'item-9',
    itemId: '9',
    name: 'Explore Jumpsuit 2',
    description: 'Explore Jumpsuit 2',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/164088301940160ibnp.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Jumpsuit',
      slug: 'jumpsuit',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Unisex',
      value: 'unisex',
    },
    ...defaultData,
  },

  // Chest Cover
  {
    id: 'item-10',
    itemId: '10',
    name: 'Chest Cover',
    description: 'Chest Cover',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/1640883213251nno0wi.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Chest Cover',
      slug: 'chest-cover',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Unisex',
      value: 'unisex',
    },
    ...defaultData,
  },

  // Shirt
  {
    id: 'item-11',
    itemId: '11',
    name: 'Urban Shirt',
    description: 'Urban Shirt',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/1640883213218k7m0bx.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Shirt',
      slug: 'shirt',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Female',
      value: 'female',
    },
    ...defaultData,
  },
  {
    id: 'item-12',
    itemId: '12',
    name: 'Urban Shirt 2',
    description: 'Urban Shirt 2',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/164088321459517av6i.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Shirt',
      slug: 'shirt',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Female',
      value: 'female',
    },
    ...defaultData,
  },
  {
    id: 'item-103',
    itemId: '103',
    name: 'Adam Shirt',
    description: 'Adam Shirt',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/16426682973559s876q.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Shirt',
      slug: 'shirt',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Male',
      value: 'male',
    },
    ...defaultData,
  },

  // Pant
  {
    id: 'item-13',
    itemId: '13',
    name: 'Pant',
    description: 'Pant',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/1640881464715bxh77.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Pant',
      slug: 'pant',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Female',
      value: 'female',
    },
    ...defaultData,
  },
  {
    id: 'item-104',
    itemId: '104',
    name: 'Pant 2',
    description: 'Pant 2',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642669348677fe27hr.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Pant',
      slug: 'pant',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Female',
      value: 'female',
    },
    ...defaultData,
  },
  {
    id: 'item-105',
    itemId: '105',
    name: 'Adam Pant',
    description: 'Adam Pant',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642668883242gzus3g.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Pant',
      slug: 'pant',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Male',
      value: 'male',
    },
    ...defaultData,
  },

  // Boots
  {
    id: 'item-14',
    itemId: '14',
    name: 'Boots',
    description: 'Boots',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/16408813917037l6jic.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Boots',
      slug: 'boots',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Unisex',
      value: 'unisex',
    },
    ...defaultData,
  },

  // Gloves
  {
    id: 'item-15',
    itemId: '15',
    name: 'Gloves',
    description: 'Gloves',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/16408813440605nmb7.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Gloves',
      slug: 'gloves',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Unisex',
      value: 'unisex',
    },
    ...defaultData,
  },
  {
    id: 'item-105',
    itemId: '105',
    name: 'Gloves 2',
    description: 'Gloves 2',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642667581771o7kamp.png',
    category: {
      name: 'Apparel',
      slug: 'apparel',
    },
    subCategory: {
      name: 'Gloves',
      slug: 'gloves',
    },
    class: {
      label: 'Basic',
      value: 'basic',
    },
    gender: {
      label: 'Unisex',
      value: 'unisex',
    },
    ...defaultData,
  },

  // Upper rover
  {
    id: 'item-21',
    itemId: '21',
    name: 'Pathfinder Torso',
    description: 'Pathfinder Torso',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642663891445v1fczg.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'Upper rover',
      slug: 'upper-rover',
    },
    ...defaultData,
  },
  {
    id: 'item-22',
    itemId: '22',
    name: 'Moleryn Torso',
    description: 'Moleryn Torso',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642663891755ppri6.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'Upper rover',
      slug: 'upper-rover',
    },
    ...defaultData,
  },
  {
    id: 'item-23',
    itemId: '23',
    name: 'Exos Torso',
    description: 'Exos Torso',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642663897669fjdpp.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'Upper rover',
      slug: 'upper-rover',
    },
    ...defaultData,
  },
  {
    id: 'item-24',
    itemId: '24',
    name: 'Cargocraft Torso',
    description: 'Cargocraft Torso',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642663898316epb516.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'Upper rover',
      slug: 'upper-rover',
    },
    ...defaultData,
  },
  {
    id: 'item-25',
    itemId: '25',
    name: 'Vellou Torso',
    description: 'Vellou Torso',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642663899829ko4b7.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'Upper rover',
      slug: 'upper-rover',
    },
    ...defaultData,
  },

  // Lower rover
  {
    id: 'item-26',
    itemId: '26',
    name: 'Pathfinder Chassis',
    description: 'Pathfinder Chassis',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642665134262nq6kp8.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'Lower rover',
      slug: 'lower-rover',
    },
    ...defaultData,
  },
  {
    id: 'item-27',
    itemId: '27',
    name: 'Moleryn Chassis',
    description: 'Moleryn Chassis',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642665134319lnrpz.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'Lower rover',
      slug: 'lower-rover',
    },
    ...defaultData,
  },
  {
    id: 'item-28',
    itemId: '28',
    name: 'Exos Chassis',
    description: 'Exos Chassis',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642665140246w1t0pp.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'Lower rover',
      slug: 'lower-rover',
    },
    ...defaultData,
  },
  {
    id: 'item-29',
    itemId: '29',
    name: 'Cargocraft Chassis',
    description: 'Cargocraft Chassis',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/1642665140419duxmv.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'Lower rover',
      slug: 'lower-rover',
    },
    ...defaultData,
  },
  {
    id: 'item-30',
    itemId: '30',
    name: 'Vellou Chassis',
    description: 'Vellou Chassis',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2022/1/16426651464333prcnv.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'Lower rover',
      slug: 'lower-rover',
    },
    ...defaultData,
  },

  // PLSS
  {
    id: 'item-31',
    itemId: '31',
    name: 'Standard PLSS',
    description: 'Standard PLSS',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/1640881247675qw552d.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'PLSS',
      slug: 'plss',
    },
    ...defaultData,
  },
  {
    id: 'item-32',
    itemId: '32',
    name: 'Enhanced PLSS',
    description: 'Enhanced PLSS',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/1640881243299afpuso.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'PLSS',
      slug: 'plss',
    },
    ...defaultData,
  },
  {
    id: 'item-33',
    itemId: '33',
    name: 'Fashionista PLSS',
    description: 'Fashionista PLSS',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/16408812433410ljdv8.png',
    category: {
      name: 'Technology',
      slug: 'technology',
    },
    subCategory: {
      name: 'PLSS',
      slug: 'plss',
    },
    ...defaultData,
  },

  // Supply crates
  {
    id: 'item-34',
    itemId: '34',
    name: 'Supply Crates - Basic',
    description: 'Supply Crates - Basic',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/164088084084410z1zv2.png',
    category: {
      name: 'Specials',
      slug: 'specials',
    },
    subCategory: {
      name: 'Supply crates',
      slug: 'supply-crates',
    },
    ...defaultData,
  },
  {
    id: 'item-35',
    itemId: '35',
    name: 'Supply Crates - Elite',
    description: 'Supply Crates - Elite',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/1640880840927k35z0w.png',
    category: {
      name: 'Specials',
      slug: 'specials',
    },
    subCategory: {
      name: 'Supply crates',
      slug: 'supply-crates',
    },
    ...defaultData,
  },
  {
    id: 'item-36',
    itemId: '36',
    name: 'Supply Crates - Master',
    description: 'Supply Crates - Master',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/16408808458764t47yk.png',
    category: {
      name: 'Specials',
      slug: 'specials',
    },
    subCategory: {
      name: 'Supply crates',
      slug: 'supply-crates',
    },
    ...defaultData,
  },
  {
    id: 'item-37',
    itemId: '37',
    name: 'Supply Crates - Legacy',
    description: 'Supply Crates - Legacy',
    thumbnail: 'https://lom.s3.ap-southeast-1.amazonaws.com/2021/12/1640880845758iqvp8b.png',
    category: {
      name: 'Specials',
      slug: 'specials',
    },
    subCategory: {
      name: 'Supply crates',
      slug: 'supply-crates',
    },
    ...defaultData,
  },
];
