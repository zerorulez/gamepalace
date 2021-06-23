const { Model, DataTypes } = require('sequelize');

class Image extends Model {
  static init(connection) {
    super.init({
      filename: DataTypes.STRING,
      mimetype: DataTypes.STRING
    }, {
      sequelize: connection,
      defaultScope: {
        attributes: { exclude: [ 'postId' ] }
      }
    })
  }

  static associate(models) {
    this.belongsTo(models.post, { foreignKey: 'id', as: 'post' });
  }
}

module.exports = Image;