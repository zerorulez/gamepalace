const { Sequelize } = require('sequelize');
const config = require('./config/database');

const User = require('./models/User.js');
const Post = require('./models/Post.js');
const Image = require('./models/Image.js');
const Reply = require('./models/Reply.js');

// Connect no banco de dados
const sequelize = new Sequelize(config);

User.init(sequelize);
Post.init(sequelize);
Image.init(sequelize);
Reply.init(sequelize);

User.associate(sequelize.models);
Post.associate(sequelize.models);
Image.associate(sequelize.models);
Reply.associate(sequelize.models);

module.exports = sequelize;