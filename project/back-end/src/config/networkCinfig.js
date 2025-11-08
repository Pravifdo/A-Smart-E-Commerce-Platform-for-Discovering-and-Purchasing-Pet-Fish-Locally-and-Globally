// Network Configuration Settings
const networkConfig = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  corsOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
  ],
  rateLimits: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  timeout: 30000, // 30 seconds
  bodyLimit: '10mb',
};

module.exports = networkConfig;