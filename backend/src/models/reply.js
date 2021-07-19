const { Model, DataTypes } = require('sequelize');

class reply extends Model {
    static init(connection) {
        super.init({
          description: DataTypes.STRING
        }, {
          sequelize: connection,
          defaultScope: {
            attributes: { exclude: [ 'userId', 'postId' ] }
          }
        })
    }

    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.post, { foreignKey: 'postId', as: 'post' });
      this.hasMany(models.image, { foreignKey: 'replyId', as: 'images' });
    }
}

module.exports = reply;