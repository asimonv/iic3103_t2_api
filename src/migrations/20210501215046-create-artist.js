"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Artists", {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        noUpdate: true,
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
    await queryInterface.dropTable("Artists");
  },
};
