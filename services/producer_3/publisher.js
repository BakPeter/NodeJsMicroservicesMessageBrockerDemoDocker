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
    const key_topic = 'topic.three';
    const msg = 'message for topic: ' + key_topic;

    channel.assertExchange(exchange, 'topic', {
      durable: false,
    });

    setInterval(() => {
      var msgToPublish = msg + ' 2500ms interval';
      channel.publish(exchange, key_topic, Buffer.from(msgToPublish));
    }, 2500);

    // for (let i = 0; i < 10; i++) {
    //   var msgToPublish = msg + ' !! ' + i;
    //   channel.publish(exchange, key_topic, Buffer.from(msgToPublish));
    // }

    console.log(" producer_3 Sent %s: '%s'", key_topic, msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 30000);
});
