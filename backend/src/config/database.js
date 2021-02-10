require('dotenv').config();

module.exports = {
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    timezone: '-03:00',
    database: process.env.DATABASE_NAME,
    define: {
        timestamps: true
    }
}