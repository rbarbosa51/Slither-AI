const mongoose = require('mongoose');
//Uncomment when ready for Atlas testing
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project3');

module.exports = mongoose.connection;
