const mysql = require('mysql2/promise');
const config = require('../config');

// connect to the database and run queries
async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);

    return results;
}

module.exports = {
    query
}