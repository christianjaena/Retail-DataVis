const Pool = require('pg').Pool

const config = {
    user: '',
    password: '',
    host: '',
    database: '',
    port: ''
}

const pool = new Pool(config)

module.exports = pool;