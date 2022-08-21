const {
  consume: consumeAdp,
} = require('../src/rabbitMq/adapters/subscriberRabbitMqAdapter');

function consume(consumerName, topics, onMessageCallback, onErrorCallback) {
  consumeAdp(consumerName, topics, onMessageCallback, onErrorCallback);
}

module.exports = { consume };
