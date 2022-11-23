const ITEM_STATUS_PENDING = 'PENDING';
const ITEM_STATUS_APPROVE = 'APPROVE';
const ITEM_STATUS_REJECT = 'REJECT';

const ITEM_STATUS = {
  ITEM_STATUS_PENDING,
  ITEM_STATUS_APPROVE,
  ITEM_STATUS_REJECT,
};

const ORDER_STATUS_PENDING = 'PENDING';
const ORDER_STATUS_PAID = 'PAID';
const ORDER_STATUS_FAILED = 'FAILED';
const ORDER_STATUS_CANCELLED = 'CANCELLED';

const ORDER_STATUS = {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_PAID,
  ORDER_STATUS_FAILED,
  ORDER_STATUS_CANCELLED,
};

const PAYMENT_METHOD_PAYPAL = 'PAYPAL';
const PAYMENT_METHOD_VISA = 'VISA';

const PAYMENT_METHOD = {
  PAYMENT_METHOD_PAYPAL,
  PAYMENT_METHOD_VISA,
};

const CATEGORY_TYPE_WEARABLE = 'WEARABLE';
const CATEGORY_TYPE_PET = 'PET';
const CATEGORY_TYPE_CONSTRUCTS = 'CONSTRUCTS';

const CATEGORY_TYPES = {
  CATEGORY_TYPE_WEARABLE,
  CATEGORY_TYPE_PET,
  CATEGORY_TYPE_CONSTRUCTS,
};

const ORDER_TYPE_CREATION = 'CREATION';
const ORDER_TYPE_RESOLD = 'RESOLD';

const ORDER_TYPES = {
  ORDER_TYPE_CREATION,
  ORDER_TYPE_RESOLD,
};

module.exports = {
  ITEM_STATUS,
  ORDER_STATUS,
  PAYMENT_METHOD,
  CATEGORY_TYPES,
  ORDER_TYPES,
};