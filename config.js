// configurations: the database credentials and rows per page we want to show when we paginate results
require("dotenv").config();
const parseURL = require("parse-database-url");

const env = process.env;

// parse database information from database URL
const dbConfig = parseURL(env.CLEARDB_DATABASE_URL);

const config = {
  /* sensitive info kept in .env file (dev) and environment variables (prod) */
  db: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  },
  listPerPage: env.LIST_PER_PAGE || 10,
  authAudience: env.AUTH0_AUDIENCE,
  authDomain: env.AUTH0_DOMAIN,
};

module.exports = config;
