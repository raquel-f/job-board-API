// configurations: the database credentials and rows per page we want to show when we paginate results
require('dotenv').config();

const env = process.env;

const config = {
    /* sensitive info kept in .env file (dev) and environment variables (prod) */
    db: { 
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
    },
    listPerPage: env.LIST_PER_PAGE || 10,
    authAudience: env.AUTH0_AUDIENCE, 
    authDomain: env.AUTH0_DOMAIN,
};

module.exports = config;