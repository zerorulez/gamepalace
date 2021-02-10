const { Model, DataTypes } = require('sequelize');

class Post extends Model {
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
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
      this.hasMany(models.Reply, { foreignKey: 'postId', as: 'Replies' });
    }
}

module.exports = Post;