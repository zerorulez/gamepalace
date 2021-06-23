const { Model, DataTypes } = require('sequelize');

class post extends Model {
  static init(connection) {
    super.init({
      title: DataTypes.STRING,
      description: DataTypes.STRING
    }, {
      sequelize: connection,
      defaultScope: {
        attributes: { exclude: [ 'userId' ] }
      }
    })
  }

  static associate(models) {
    this.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
    this.hasMany(models.reply, { foreignKey: 'postId', as: 'replies' });
    this.hasMany(models.image, { foreignKey: 'postId', as: 'images' });
  }
}

module.exports = post;