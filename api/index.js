
// api/index.js
const serverless = require('serverless-http');
const app = require('../indexgi');

module.exports = serverless(app);

