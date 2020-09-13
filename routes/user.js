const router = require('koa-router')()
router.prefix('/api/user')
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../module/resModule')

router.post('/login', async(ctx, next) => {
    const { username, password } = ctx.request.body
        // ctx.session.username = username
    const data = await login(username, password)
    if (data) {
        ctx.session.username = username
        ctx.body = SuccessModel()
        return
    }

    ctx.body = new ErrorModel('登录失败')
        // ctx.body = {
        //     data: { username, password },
        //     err: 0
        // }
})

// router.get('/login-test', async(ctx, next) => {
//     // ctx.session.counter ++;
//     // if (ctx.session.count === null) {
//     //     ctx.session.count = 0
//     // }
//     // ctx.session.count++

//     //     ctx.body = {
//     //         title: "访问次数",
//     //         count: ctx.session.count
//     //     }

//     if (ctx.session.viewCount == null) {
//         ctx.session.viewCount = 0
//     }
//     ctx.session.viewCount++

//         ctx.body = {
//             errno: 0,
//             viewCount: ctx.session.viewCount
//         }
// })

module.exports = router