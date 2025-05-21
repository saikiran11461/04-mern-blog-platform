const redis = require('redis');

const redisClient = redis.createClient(); // default localhost:6379

redisClient.connect().catch(console.error);

module.exports = {redisClient};
