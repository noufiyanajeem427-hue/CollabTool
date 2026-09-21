const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URL || 'mongodb://localhost:27017/collabtool',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = config;
