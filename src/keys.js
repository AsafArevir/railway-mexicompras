const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'Nolose123$'
const DB_NAME = process.env.DB_NAME || 'mexicompras'
const DB_PORT = process.env.DB_PORT || 3306

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
