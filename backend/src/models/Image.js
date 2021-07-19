const { Model, DataTypes } = require('sequelize');

class image extends Model {
  static init(connection) {
    super.init({
      filename: DataTypes.STRING,
      mimeType: DataTypes.STRING
    }, {
      sequelize: connection
    })
  }

  static associate(models) {
    this.belongsTo(models.post, { foreignKey: 'id', as: 'post' });
    // this.belongsTo(models.reply, { foreignKey: 'id', as: 'reply' });
  }
}

module.exports = image;