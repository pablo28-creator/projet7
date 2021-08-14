'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post, Comment}) {
      // define association here
      this.hasMany(Post, {
        foreignKey: "userId", as: "post",
        onDelete: "cascade",
        hooks: true,
        onUpdate: "cascade"
      })
      this.hasMany(Comment, {
        foreignKey: "userId", as: "comment",
        onDelete: "cascade",
        hooks: true,
        onUpdate: "cascade"
      })
    }
    toJSON(){
      return{ ...this.get(), id: undefined}
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have name"},
        notEmpty: { msg: "Name must not be empty"},
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have email"},
        notEmpty: { msg: "Email must not be empty"},
        isEmail: { msg: "Must be a valid email adress"},

      },
      unique: {
        args:true,
        msg: 'Email address already in use!'
    }  
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have password"},
        notEmpty: { msg: "Password must not be empty"},
      }
    },
    
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
return User
}
