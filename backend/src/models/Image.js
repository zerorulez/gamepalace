const { Model, DataTypes } = require('sequelize');

class image extends Model {
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

module.exports = image;