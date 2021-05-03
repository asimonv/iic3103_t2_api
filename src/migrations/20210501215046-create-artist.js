"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Artists", {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      albums: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tracks: {
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
    await queryInterface.dropTable("Artists");
  },
};
