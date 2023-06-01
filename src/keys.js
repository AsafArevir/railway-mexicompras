import {
    DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT
} from './config.js'

module.exports = {

    database: {
        connectionLimit: 30,
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port : DB_PORT
    }

};