const {
  publish: publishAdp,
  closeConnection: closeConnectionAdp,
} = require('./rabbitMq/adapters/publisherRabbitMqAdapter');

function publish(topic, message) {
  publishAdp(topic, message);
}

function closeConnection() {
  closeConnectionAdp();
}

module.exports = { publish, closeConnection };
