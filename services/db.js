const mysql = require("mysql2/promise");
const config = require("../config");

// connect to the database
const pool = mysql.createPool(config.db);

// run queries
async function query(sql, params) {
  const [results] = await pool.query(sql, params);
  return results;
}

module.exports = {
  query,
};
