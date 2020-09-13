var router = require('koa-router')();
router.prefix('/api/blog')
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')

const loginCheck = require('../middleware/loginCheck');
const { SuccessModel, ErrorModel } = require('../module/resModule');
// const { log } = require('debug');


router.get('/list', async(ctx, next) => {
    // const {username, password} = ctx.body
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''
    console.log('查询')
    if (ctx.query.isadmin) {
        //cons
        console.log('is admin')
        if (ctx.session.username == null) {
            console.log('未登录')
            ctx.body = new ErrorModel('未登录')
            return
        }
        //强制查询自己的博客
        author = ctx.session.username
    }

    const listData = await getList(author, keyword)

    ctx.body = new SuccessModel(listData)
})

router.get('/detail', async(ctx, next) => {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async(ctx, next) => {
    // const body = ctx.query.body
    const body = ctx.request.body
    body.author = ctx.session.username
    const data = await newBlog(body)
    ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async(ctx, next) => {
    // const val = ctx.request.body
    const val = await updateBlog(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新成功')
    }
})

router.post('/del', loginCheck, (ctx, next) => {
    // const val = delBlog(ctx.query.id)
    const username = ctx.session.username
    const val = delBlog(ctx.query.id, author)

    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('删除微博成功')
    }

})

module.exports = router