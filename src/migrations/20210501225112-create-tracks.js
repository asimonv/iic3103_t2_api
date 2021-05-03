"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tracks", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        noUpdate: true,
      },
      album_id: {
        allowNull: false,
        type: Sequelize.STRING,
        noUpdate: true,
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
        noUpdate: true,
      },
      artist: {
        allowNull: false,
        type: Sequelize.STRING,
        noUpdate: true,
      },
      album: {
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
    await queryInterface.dropTable("Tracks");
  },
};
