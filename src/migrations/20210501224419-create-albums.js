"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Albums", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        noUpdate: true,
      },
      artist_id: {
        allowNull: false,
        type: Sequelize.STRING,
        noUpdate: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      genre: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      artist: {
        allowNull: false,
        type: Sequelize.STRING,
        noUpdate: true,
      },
      tracks: {
        allowNull: false,
        type: Sequelize.STRING,
        noUpdate: true,
      },
      self: {
        allowNull: false,
        type: Sequelize.STRING,
        noUpdate: true,
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
