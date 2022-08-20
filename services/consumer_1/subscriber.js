var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var exchange = 'myExchange';
    const keys_topics = ['topic.one', 'topic.three'];

    channel.assertExchange(exchange, 'topic', {
      durable: false,
    });

    channel.assertQueue(
      'consumer_two_queue',
      {
        exclusive: true,
      },
      function (error2, q) {
        if (error2) {
          throw error2;
        }
        console.log(' consumer_1 Waiting for logs. To exit press CTRL+C');

        keys_topics.forEach(function (key) {
          channel.bindQueue(q.queue, exchange, key);
        });

        channel.consume(
          q.queue,
          function (msg) {
            console.log(
              " [x] %s:'%s'",
              msg.fields.routingKey,
              msg.content.toString()
            );
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});
