const mongoose = require('mongoose');

const config = require('../config.json');

// connect to mongo db
const mongoUri = config.mongoUri;
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

module.exports = mongoose
