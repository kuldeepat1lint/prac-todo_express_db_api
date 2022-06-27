const mysql = require('mysql')
const {
    host,
    user,
    password,
    database
} = require('../config/mysql_config')

const connection = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
})

module.exports = connection