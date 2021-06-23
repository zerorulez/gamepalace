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
      this.belongsTo(models.user, { foreignKey: 'id', as: 'user' });
      this.belongsTo(models.post, { foreignKey: 'id', as: 'post' });
    }
}

module.exports = reply;