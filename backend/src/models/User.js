const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
          username: DataTypes.STRING,
          email: DataTypes.STRING,
          avatar: DataTypes.STRING,
          avatarMimeType: DataTypes.STRING,
          about: DataTypes.STRING,
          password: DataTypes.STRING,
          passwordResetToken: DataTypes.STRING,
          passwordResetExpires: DataTypes.DATE
        }, {
          sequelize: connection,
          defaultScope: {
            attributes: { exclude: [ 'email', 'password', 'passwordResetToken', 'passwordResetExpires'] },
          }
        })
    }

    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'userId', as: 'User' });
    }
}

module.exports = User;