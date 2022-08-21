const amqp = require('amqplib/callback_api');
const settings = require('../configuration/settings.json');

function buildChannel(channelCreatedCallback, errorCallback) {
  amqp.connect(settings.hostName, function (error0, connection) {
    if (error0) {
      errorCallback(error0);
    }

    connection.createChannel(function (error1, channel) {
      if (error1) {
        errorCallback(error1);
      }

      channelCreatedCallback(channel);
    });
  });
}

module.exports = { buildChannel };
