"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tracks", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      album_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      duration: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      times_played: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      artist: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      album: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      self: {
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
    await queryInterface.dropTable("Tracks");
  },
};
