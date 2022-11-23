const express = require('express');

const router = express.Router();

const {
  getUsers,
  getUserFriends,
  updateUserInfo,
  getUserInfo,
  // updateSizes,
  addFriend,
  deleteFriend,
} = require('./controllers');

const {
  checkUpdateInfo,
  // checkSizes,
  checkFriend,
} = require('./validations');

const { handleValidate } = require('../middleware');

router.get('/', getUsers);

router.route('/me/friends')
  .get(getUserFriends)
  .post(checkFriend, handleValidate, addFriend)
  .delete(checkFriend, handleValidate, deleteFriend);

router.route('/me')
  .get(getUserInfo)
  .put(checkUpdateInfo, handleValidate, updateUserInfo);

// router.put('/me/sizes', checkSizes, handleValidate, updateSizes);

module.exports = router;
