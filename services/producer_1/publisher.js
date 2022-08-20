var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    const exchange = 'myExchange';
    const key_topic = 'topic.one';
    const msg = 'message for topic: ' + key_topic;

    channel.assertExchange(exchange, 'topic', {
      durable: false,
    });

    setInterval(() => {
      var msgToPublish = msg + ' 1000ms interval';
      channel.publish(exchange, key_topic, Buffer.from(msgToPublish));
    }, 1000);
    // for (let i = 0; i < 50; i++) {
    //   var msgToPublish = msg + i * 1;
    //   channel.publish(exchange, key_topic, Buffer.from(msgToPublish));
    // }

    console.log(" producer_1 Sent %s: '%s'", key_topic, msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 30000);
});
