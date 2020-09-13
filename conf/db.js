const ENV = process.env.NODE_ENV
let MYSQL_CONF
let REDIS_CONF
    //判断运行环境
if (ENV === 'env') {
    // 开发环境
    // MYSQL_CONF = {
    //         // host: 'localhost',
    //         host: 'localhost',
    //         port: '3306',
    //         user: 'root',
    //         password: '123456',
    //         database: 'myblog'
    //     },
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        port: '6379',
        host: '127.0.0.1'
    }
} else {
    // 线上运行环境
    // MYSQL_CONF = {
    //         host: 'localhost',
    //         port: '3306',
    //         user: 'root',
    //         password: '123456',
    //         database: 'myblog'
    //     },

    MYSQL_CONF = {
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'myblog'
        },


        REDIS_CONF = {
            port: '6379',
            host: '127.0.0.1'
        }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}