const {
  consume: consumeAdp,
} = require('./rabbitMq/adapters/subscriberRabbitMqAdapter');

function consume(consumerName, topics, onMessageCallback, onErrorCallback) {
  consumeAdp(consumerName, topics, onMessageCallback, onErrorCallback);
}

module.exports = { consume };
