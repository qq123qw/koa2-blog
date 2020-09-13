const xss = require('xss')
const { exce } = require('../db/mysql')

const getList = async(author, keyword) => {
    let sql = `select * from blog where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return await exce(sql)
}

const getDetail = async(id) => {
    const sql = `select * from blog where id='${id}' `
    const rows = await exce(sql)
    return rows[0]
}

const newBlog = async(blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 属性
    const title = xss(blogData.title)
        // console.log('title is', title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blog (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `

    const insertData = await exce(sql)
    return {
        id: insertData.insertId
    }
}

const updateBlog = async(id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性

    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const sql = `
        update blog set title='${title}', content='${content}' where id=${id}
     `

    const updateData = await exce(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
}

const delBlog = async(id, author) => {
    // id 就是要删除博客的 id
    const sql = `delete from blog where id='${id}' and author='${author}';`
    const delData = await exce(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}