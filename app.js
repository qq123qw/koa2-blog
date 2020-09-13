const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')



const session = require('koa-generic-session')
const redisStore = require('koa-redis')
    // 引入redis配置
const { REDIS_CONF } = require('./conf/db')
const morgan = require('koa-morgan')
const fs = require('fs')
const path = require('path')



const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')
const { start } = require('repl')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// 开发日志
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method}  ${ctx.url} ${ctx} - ${ms}ms`)
})

//判断运行环境
// const ENV = NODE_ENV
const ENV = process.env.NODE_ENV
if (ENV === 'env') {
    //开发环境
    // 获取路径，写日记
    app.use(morgan('dev'))
} else {
    // 线上运行环境
    const fileName = path.join(__dirname, 'logs', 'access.log')
    const writeStream = fs.createWriteStream(fileName, {
        flags: 'a'
    })
    app.use(morgan('combined', {
        stream: writeStream
    }))
}


// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// session配置
app.keys = ['asdasdQW_1~']

app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    //配置redis
    redisStore: {
        // all: '127.0.0.1:6379'
        //根据开发环境进行配置
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    }
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())
    // error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app