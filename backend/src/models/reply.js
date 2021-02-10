const { Model, DataTypes } = require('sequelize');

class Reply extends Model {
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
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
      this.belongsTo(models.Post, { foreignKey: 'postId', as: 'Post' });
    }
}

module.exports = Reply;