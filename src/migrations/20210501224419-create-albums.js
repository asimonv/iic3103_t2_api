"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Albums", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      artist_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      genre: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Albums");
  },
};
