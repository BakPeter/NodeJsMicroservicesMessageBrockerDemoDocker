const { publish, closeConnection } = require('./src/publisher');
const { consume } = require('./src/subscriber');

module.exports = { publish, closeConnection, consume };
