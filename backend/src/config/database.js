require('dotenv').config();

module.exports = {
    dialect: 'mariadb',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    timezone: '-03:00',
    database: process.env.DATABASE_NAME,
    define: {
        timestamps: true
    }
}