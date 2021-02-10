const { Sequelize } = require('sequelize');
const config = require('./config/database');

const User = require('./models/user');
const Post = require('./models/post');
const Reply = require('./models/reply');

// Connect no banco de dados
const sequelize = new Sequelize(config);

User.init(sequelize);
Post.init(sequelize);
Reply.init(sequelize);
User.associate(sequelize.models);
Post.associate(sequelize.models);
Reply.associate(sequelize.models);

module.exports = sequelize;