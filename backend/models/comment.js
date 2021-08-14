'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User }) {
      // define association here
      this.belongsTo(Post, {
        foreignKey: "postId", as: "post"})
      this.belongsTo(User, {
        foreignKey: "userId", as: "user"})
      } 
    toJSON(){
      return{ ...this.get(), id: undefined, postId: undefined, userId: undefined}
  }};
  Comment.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    postId:{
      type: DataTypes
    },
    userId:{
      type: DataTypes
    },
    body: {
      type: DataTypes,
      allowNull: false,
      validate: {
        notNull: { msg: "Post must not be null"},
        notEmpty: { msg: "Post must not be empty"},
      }
    },
    postUuid: {
      type: DataTypes
    },
    likes: {
      type: DataTypes
    },
    dislikes: {
      type: DataTypes
    },
    usersLiked: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
          return this.getDataValue('usersLiked').split(',')
      },
      set(val) {
         this.setDataValue('usersLiked',val.join(','));
      }
    },
    usersDisliked: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
          return this.getDataValue('usersDisliked').split(';')
      },
      set(val) {
         this.setDataValue('usersDisliked',val.join(';'));
      }
    } 
    }, { 
    sequelize,
    tableName: "comments",
    modelName: 'Comment',
    });
  return Comment;
};