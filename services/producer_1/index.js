const { publish, closeConnection } = require('../messageBroker');
const settings = require('./settings.json');

console.log('producer_1 is up');

setInterval(() => {
  const msg =
    'message for topic: ' +
    settings.topic_1 +
    ' ' +
    settings.interval_1 +
    'ms interval';
  publish(settings.topic_1, Buffer.from(msg));

  console.log(" producer_1 Sent %s: '%s'", settings.topic_1, msg);
}, settings.interval_1);

setInterval(() => {
  const msg =
    'message for topic: ' +
    settings.topic_4 +
    ' ' +
    settings.interval_4 +
    'ms interval';
  publish(settings.topic_4, Buffer.from(msg));

  console.log(" producer_1 Sent %s: '%s'", settings.topic_4, msg);
}, settings.interval_4);

setTimeout(function () {
  closeConnection();
  process.exit(0);
}, 30000);
