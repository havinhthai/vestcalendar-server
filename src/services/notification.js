const FCM = require('fcm-node');

const fcm = new FCM(process.env.FIREBASE_SERVER_KEY);

const NotifyService = {
  pushNotification: ({
    deviceToken,
    deviceType,
    message,
    data,
  }) => {
    let messageData;

    if (deviceType === 'android') {
      messageData = {
        to: deviceToken,
        data: {
          custom_notification: {
            body: message,
            sound: 'default',
            priority: 'high',
            show_in_foreground: true,
            payload: data,
          },
        },
        priority: 10,
      };
    } else {
      messageData = {
        to: deviceToken,
        notification: {
          body: message,
          sound: 'default',
          show_in_foreground: true,
        },
        data: {
          payload: data,
        },
        priority: 10,
      };
    }

    fcm.send(messageData, (err, response) => {
      if (err) {
        console.log('Something has gone wrong!', err);
      } else {
        console.log('Successfully sent with response: ', response);
      }
    });
  },
};

module.exports = NotifyService;
