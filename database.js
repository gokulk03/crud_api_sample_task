const mysql = require('mysql2/promise')
const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Gokul@003',
    database:'demodatabase'
})


module.exports = mysqlPool

