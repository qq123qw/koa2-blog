const redis = require('redis')

// 创建连接的客户端
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redis.on('error', err => {
    console.log(err)
})