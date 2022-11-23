const [
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
] = [
  400,
  401,
  403,
  404,
  409,
  500,
];

module.exports = {
  // 400
  badRequest: {
    status: BAD_REQUEST,
    code: 400,
    message: 'Bad Request',
  },
  statusInvalid: {
    status: BAD_REQUEST,
    code: 4001,
    message: 'Status is invalid',
  },

  // 401
  invalidFbToken: {
    status: UNAUTHORIZED,
    code: 4011,
    message: 'Invalid Facebook Token',
  },
  requireAuthToken: {
    status: UNAUTHORIZED,
    code: 4012,
    message: 'Authorization is required',
  },
  userNotExists: {
    status: UNAUTHORIZED,
    code: 4013,
    message: 'User is not exists',
  },
  invalidAuthToken: {
    status: UNAUTHORIZED,
    code: 4014,
    message: 'Invalid Authorization',
  },
  tokenExpired: {
    status: UNAUTHORIZED,
    code: 4015,
    message: 'Authorization Expired',
  },

  // 403
  forbidden: {
    status: FORBIDDEN,
    code: 403,
    message: 'Forbidden',
  },
  userIsBlocked: {
    status: FORBIDDEN,
    code: 4031,
    message: 'User is blocked',
  },
  needUpdateBirthday: {
    status: FORBIDDEN,
    code: 4032,
    message: 'User need update birthday',
  },
  listIsBlocked: {
    status: FORBIDDEN,
    code: 4033,
    message: 'User of list is blocked',
  },
  cantSendNotification: {
    status: FORBIDDEN,
    code: 4034,
    message: 'You can\'t send notification',
  },
  cantUpdateUserProduct: {
    status: FORBIDDEN,
    code: 4035,
    message: 'You can\'t update this user product',
  },
  requireConnectFacebook: {
    status: FORBIDDEN,
    code: 4036,
    message: 'User need connect facebook account',
  },

  // 404
  notFound: {
    status: NOT_FOUND,
    code: 404,
    message: 'Not Found',
  },
  blogPostNotFound: {
    status: NOT_FOUND,
    code: 4041,
    message: 'Blog post not found',
  },
  categoryNotFound: {
    status: NOT_FOUND,
    code: 4042,
    message: 'Category not found',
  },
  productNotFound: {
    status: NOT_FOUND,
    code: 4043,
    message: 'Product not found',
  },
  userNotFound: {
    status: NOT_FOUND,
    code: 4044,
    message: 'User not found',
  },
  listNotFound: {
    status: NOT_FOUND,
    code: 4045,
    message: 'List not found',
  },
  userProductNotFound: {
    status: NOT_FOUND,
    code: 4046,
    message: 'User Product not found',
  },
  friendNotFound: {
    status: NOT_FOUND,
    code: 4047,
    message: 'Friend not found',
  },
  notificationNotFound: {
    status: NOT_FOUND,
    code: 4048,
    message: 'Notification not found',
  },
  requestItemNotFound: {
    status: NOT_FOUND,
    code: 4049,
    message: 'Request item not found',
  },
  orderNotFound: {
    status: NOT_FOUND,
    code: 40401,
    message: 'Order not found',
  },
  projectNotFound: {
    status: NOT_FOUND,
    code: 40402,
    message: 'Project not found',
  },
  watchProjectNotFound: {
    status: NOT_FOUND,
    code: 40403,
    message: 'Project has not existed in your watch list.',
  },

  // 409
  conflict: {
    status: CONFLICT,
    code: 409,
    message: 'Conflict',
  },
  friendExists: {
    status: CONFLICT,
    code: 4091,
    message: 'Friend is exists',
  },
  friendNotExists: {
    status: CONFLICT,
    code: 4092,
    message: 'Friend is not exists',
  },
  listExists: {
    status: CONFLICT,
    code: 4093,
    message: 'List is exists',
  },
  productNotExistInList: {
    status: CONFLICT,
    code: 4094,
    message: 'Product is not exists in your list',
  },
  facebookAccountConnected: {
    status: CONFLICT,
    code: 4095,
    message: 'This facebook account is already linked. Please connect another facebook account or choose Login with facebook.',
  },
  watchProjectExists: {
    status: CONFLICT,
    code: 4096,
    message: 'Project has existed in your watch list.',
  },

  // 500
  serverError: {
    status: INTERNAL_SERVER_ERROR,
    code: 500,
    message: 'Internal Server Error',
  },
};
