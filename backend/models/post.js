'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      // define association here
      //userId
      this.hasMany(Comment, {
        foreignKey: "postId", as: "comment",                                  // Post relié à ses commentaire, suppression en cascade
        onDelete: "cascade",
        hooks: true,
        onUpdate: "cascade"
      })
      this.belongsTo(User, {                                                  // Post associé à un utilisateur
        foreignKey: "userId", as: "user"})
    }
    toJSON(){
      return{ ...this.get(), id: undefined, userId: undefined}
  }};
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId:{
      type: DataTypes
    },
    title:{
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
    image: {
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
    },  
},{
      sequelize,
      tableName: "posts",
      modelName: 'Post',
    });
    return Post;
  };