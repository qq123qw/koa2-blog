const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

//注册一个客户端
const con = mysql.createConnection(MYSQL_CONF)

// 少了开始连接
con.connect()

//执行mysql语句
function exce(sql) {
    // const promise = new Promise((resolve, reject) => {
    //     conn.query(sql, (err, result) => {
    //         if (err) {
    //             reject(err)
    //             return
    //         } else {
    //             resolve(result)
    //         }
    //     })
    // })
    // return promise

    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exce,
    escape: mysql.escape
}