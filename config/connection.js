const mongoose = require('mongoose');

// Wrap mongoose around local connection to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialMedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;