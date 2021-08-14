'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER
      },
      dislikes: {
        type: DataTypes.INTEGER
      },
      usersLiked: {
        type: DataTypes.STRING
      },
      usersDisliked: {
        type: DataTypes.STRING
      },
      postUuid: {
        type: DataTypes.STRING
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATEONLY
      }
      
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Comments');
  }
};