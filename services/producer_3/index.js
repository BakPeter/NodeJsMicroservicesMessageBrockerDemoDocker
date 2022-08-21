const { publish, closeConnection } = require('../messageBroker');
const settings = require('./settings.json');

console.log('producer_3 is up');

setInterval(() => {
  const msg =
    'message for topic: ' +
    settings.topic +
    ' ' +
    settings.interval +
    'ms interval';
  publish(settings.topic, Buffer.from(msg));

  console.log(" producer_3 Sent %s: '%s'", settings.topic, msg);
}, settings.interval);

setTimeout(function () {
  closeConnection();
  process.exit(0);
}, 30000);
