const { buildChannel } = require('../builder/rabittMqChannelBuilder');

const settings = require('../configuration/settings.json');
let channel;

function build(onChannelBuildCallback) {
  buildChannel(
    (newChannel) => {
      newChannel.assertExchange(settings.exchangeName, settings.exchangeType, {
        durable: false,
      });

      onChannelBuildCallback(newChannel);
    },
    (error) => {
      throw error;
    }
  );
}

function publish(topic, messageBuffer) {
  if (channel) {
    channel.publish(settings.exchangeName, topic, messageBuffer);
  } else {
    build((newChannel) => {
      channel = newChannel;
      channel.publish(settings.exchangeName, topic, messageBuffer);
    });
  }
}

function closeConnection() {
  if (channel) channel.close();
}

module.exports = { publish, closeConnection };
