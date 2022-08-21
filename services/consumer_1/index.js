const { consume } = require('../messageBroker');
const settings = require('./settings.json');

console.log(settings.serviceName + ' is up');

consume(
  settings.serviceName,
  settings.topics,
  (topic, message) => {
    console.log("%s %s:'%s'", settings.serviceName, topic, message.toString());
  },
  (error) => {
    throw error;
  }
);
