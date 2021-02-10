const { Sequelize } = require('sequelize');
const config = require('./config/database');

const User = require('./models/User');
const Post = require('./models/Post');
const Reply = require('./models/Reply');

// Connect no banco de dados
const sequelize = new Sequelize(config);

User.init(sequelize);
Post.init(sequelize);
Reply.init(sequelize);
User.associate(sequelize.models);
Post.associate(sequelize.models);
Reply.associate(sequelize.models);

module.exports = sequelize;