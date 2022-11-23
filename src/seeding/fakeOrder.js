/* eslint-disable no-await-in-loop */
const { ORDER_STATUS, PAYMENT_METHOD, ORDER_TYPES } = require('../constants');
const {
  User, Item, Order, Rarity, Category,
} = require('../models');

const fakeOrder = async () => {
  try {
    const buyer = await User.findOne({ email: 'user1@gmail.com' }).lean();
    const seller = await User.findOne({ email: 'user0@gmail.com' }).lean();

    const orderStatus = Object.values(ORDER_STATUS);
    const paymentMethod = Object.values(PAYMENT_METHOD);

    const lorem = [
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      'Contrary to popular belief, Lorem Ipsum is not simply random text',
      'There are many variations of passages of Lorem Ipsum available',
    ];

    for (let i = 0; i < 50; i += 1) {
      const item = await Item.aggregate([]).sample(1);
      const rarity = await Rarity.findById(item[0].rarity).lean();
      const category = await Category.findById(item[0].category).lean();

      let assetType = '';

      if (assetType) {
        assetType = await Category.findById(item[0]?.assetType);
      }

      const status = orderStatus[Math.floor(Math.random() * orderStatus.length)];

      await Order.create({
        orderId: `MOMORBV220220817${new Date().getTime()}_${item[0]._id}`,
        buyer: buyer._id,
        seller: seller._id,
        item: item[0]._id,
        itemInfo: {
          name: item[0].name,
          price: item[0].price,
          rarity: rarity.name,
          category: category.name,
          assetType: assetType === '' ? assetType : assetType.name,
          image: item[0].image,
          textures: item[0].textures,
          file3d: item[0].file3d,
        },
        status,
        paymentMethod: paymentMethod[Math.floor(Math.random() * paymentMethod.length)],
        price: item[0].price,
        type: ORDER_TYPES.ORDER_TYPE_CREATION,
        // eslint-disable-next-line max-len
        cancelReason: status === ORDER_STATUS.ORDER_STATUS_CANCELLED ? lorem[Math.floor(Math.random() * lorem.length)] : null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = fakeOrder;
