const http = require('http');
const app = require('./app');
const config = require('./config/env');
const connectDB = require('./config/db');

// Create HTTP server
const server = http.createServer(app);

// Start Server & Connect Database
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start listening
    server.listen(config.port, () => {
      console.log(`🚀 Server is running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error(`❌ Failed to start server: ${err.message}`);
    process.exit(1);
  }
};

startServer();
