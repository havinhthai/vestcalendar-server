const axios = require('axios');
const sha256 = require('crypto-js/sha256');
const { TwitterApi } = require('twitter-api-v2');
const hmacSha256 = require('crypto-js/hmac-sha256');

const { apiErrors, apiResponse, updateFbFriends } = require('../../../../helpers');
const { User, List } = require('../../../../models');
const { generateUserToken } = require('../../../../services/jwt');
const Jwt = require('../../../../services/jwt');

const twitterApiClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

module.exports = {
  loginWithFacebook: async (req, res, next) => {
    try {
      const {
        fbToken, appleId, deviceToken, deviceType,
      } = req.body;

      // TODO Check access_token is right of facebook app
      // const { data } = await axios.get(`https://graph.facebook.com/v3.3/debug_token?input_token=${fbToken}&access_token=${process.env.FACEBOOK_APP_TOKEN}`);

      // if (!data.data.is_valid) {
      //   return next(apiErrors.invalidFbToken);
      // }

      const { data: userProfile } = await axios.get(`https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${fbToken}`);

      if (!userProfile || !userProfile.id) {
        return next(apiErrors.invalidFbToken);
      }

      const {
        id: facebookId, first_name, last_name, email, // eslint-disable-line
      } = userProfile;

      const avatar = `https://graph.facebook.com/${facebookId}/picture?type=large`;

      let user = await User.findOne({ facebookId });

      if (!user) {
        user = new User({
          firstName: first_name,
          lastName: last_name,
          email,
          avatar,
          facebookId,
          deviceToken,
          deviceType,
          appleId,
          isConnectFB: true, // Already connect facebook
        });

        await user.save();

        await List.create({
          name: 'Ma liste publique',
          createdBy: user._id,
        });
      } else {
        // Connect facebook when signed-in by apple
        // Case error: Facebook account is already connected
        if (appleId && user.appleId) {
          return next(apiErrors.facebookAccountConnected);
        }

        if (user.isBlocked) {
          return next(apiErrors.userIsBlocked);
        }
        user.avatar = avatar;
        user.firstName = first_name; // eslint-disable-line
        user.lastName = last_name; // eslint-disable-line
        user.deviceToken = deviceToken;
        user.deviceType = deviceType;
        user.isConnectFB = true; // Already connect facebook

        if (appleId) {
          user.appleId = appleId;
        }

        await user.save();
      }

      const token = Jwt.generateUserToken(user);
      res.json(apiResponse({ token, isNewUser: !user.toObject().birthday }));

      try {
        await updateFbFriends({
          userId: user._id,
          userFacebookId: user.facebookId,
        });
      } catch (error) {
        console.log('Get facebook friends error', error.toString());
      }
    } catch (error) {
      if (error.name === 'Error') {
        return next(apiErrors.invalidFbToken);
      }
      next(error);
    }
  },

  loginWithApple: async (req, res, next) => {
    try {
      const { appleId, deviceToken, deviceType } = req.body;

      const user = await User.findOne({ appleId });

      if (!user || !user.facebookId) {
        user.isConnectFB = false; // Not connect facebook yet

        // return next(apiErrors.requireConnectFacebook);
      }

      user.deviceToken = deviceToken;
      user.deviceType = deviceType;

      await user.save();

      const token = Jwt.generateUserToken(user);
      res.json(apiResponse({ token, isNewUser: !user.toObject().birthday }));

      try {
        await updateFbFriends({
          userId: user._id,
          userFacebookId: user.facebookId,
        });
      } catch (error) {
        console.log('Get facebook friends error', error.toString());
      }
    } catch (error) {
      next(error);
    }
  },

  loginGoogle: async (req, res, next) => {
    try {
      const { accessToken } = req.body;

      const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);

      if (!data) {
        return res.status(apiErrors.invalidAuthToken.status)
          .json(apiErrors.invalidAuthToken);
      }

      const {
        sub: googleId, email, name, picture,
      } = data;

      let user = await User.findOne({ googleId })
        .select('-password')
        .lean();

      if (!user) {
        user = await User.create({
          name,
          googleId,
          email,
          avatar: picture,
        });
      }

      const token = generateUserToken(user);

      res.json(apiResponse({
        message: 'Login successfully!',
        payload: { token, user },
      }));
    } catch (error) {
      return res.status(error.response.status)
        .json(error.response.data);
    }
  },

  loginTelegram: async (req, res, next) => {
    try {
      const {
        id, hash, username, photo_url: avatar,
      } = req.body;

      const authData = {
        ...req.body,
      };

      delete authData.hash;

      const dataCheckArr = [];

      Object.keys(authData).forEach((key) => {
        dataCheckArr.push(`${key}=${authData[key]}`);
      });

      dataCheckArr.sort();

      const dataStr = dataCheckArr.join('\n');

      const secretKey = sha256(process.env.TELEGRAM_BOT_ACCESS_TOKEN);

      const generateHash = hmacSha256(dataStr, secretKey);

      if (generateHash.toString() !== hash) {
        return res.status(apiErrors.invalidAuthToken.status)
          .json(apiErrors.invalidAuthToken);
      }

      let user = await User.findOne({ telegramId: id })
        .select('-password')
        .lean();

      if (!user) {
        user = await User.create({
          name: username,
          telegramId: id,
          avatar,
        });
      }

      const token = generateUserToken(user);

      res.json(apiResponse({
        message: 'Login successfully!',
        payload: { token, user },
      }));
    } catch (error) {
      next(error);
    }
  },

  twitterRequestAuthLink: async (req, res, next) => {
    const result = twitterApiClient.generateOAuth2AuthLink(process.env.TWITTER_REDIRECT_URL, {
      scope: ['tweet.read', 'users.read'],
    });

    res.json(apiResponse({
      payload: result,
    }));
  },

  loginWithTwitter: async (req, res, next) => {
    try {
      const { code, codeVerifier } = req.body;

      const result = await twitterApiClient.loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: process.env.TWITTER_REDIRECT_URL,
      });

      const me = await result.client.v2.me({
        'user.fields': ['profile_image_url'],
      });


      let user = await User.findOne({ twitterId: me.data.id });

      if (!user) {
        user = await User.create({
          name: me.data.name,
          twitterId: me.data.id,
          // email: me.data.username,
          avatar: me.data.profile_image_url,
        });
      }

      const token = generateUserToken(user);

      res.json(apiResponse({
        message: 'Login successfully!',
        payload: { token, user },
      }));
    } catch (error) {
      console.log(error);

      next(error);
    }
  },
};
