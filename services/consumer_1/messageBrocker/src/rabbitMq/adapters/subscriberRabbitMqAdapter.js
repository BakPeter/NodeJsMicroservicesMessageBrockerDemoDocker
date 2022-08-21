const { buildChannel: build } = require('../builder/rabittMqChannelBuilder');

const settings = require('../configuration/settings.json');
let channel;

function buildChannel(onChannekBuildCallback) {
  build(
    (newChannel) => {
      newChannel.assertExchange(settings.exchangeName, settings.exchangeType, {
        durable: false,
      });

      onChannekBuildCallback(newChannel);
    },
    (error) => {
      throw error;
    }
  );
}

function consume(consumerName, topics, onMessageCallback, onErrorCallback) {
  if (channel) {
    consumeMessages(consumerName, topics, onMessageCallback, onErrorCallback);
  } else {
    buildChannel((newChannel) => {
      channel = newChannel;
      consumeMessages(consumerName, topics, onMessageCallback, onErrorCallback);
    });
  }
}
function consumeMessages(
  consumerName,
  topics,
  onMessageCallback,
  onErrorCallback
) {
  channel.assertQueue(
    consumerName + '_queue',
    {
      exclusive: true,
    },
    function (error2, q) {
      if (error2) {
        onErrorCallback(error2);
      }

      topics.forEach((key) => {
        channel.bindQueue(q.queue, settings.exchangeName, key);
      });
      channel.consume(
        q.queue,
        (msg) => {
          onMessageCallback(msg.fields.routingKey, msg.content);
        },
        {
          noAck: true,
        },
        (err, reply) => {
          if (err) onErrorCallback(err);
        }
      );
    }
  );
}

module.exports = { consume };
