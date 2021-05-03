"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tracks.init(
    {
      id: { type: DataTypes.STRING, noUpdate: true, primaryKey: true },
      album_id: DataTypes.STRING,
      name: DataTypes.STRING,
      duration: DataTypes.DOUBLE,
      times_played: DataTypes.INTEGER,
      artist: { type: DataTypes.STRING, noUpdate: true },
      album: { type: DataTypes.STRING, noUpdate: true },
      self: { type: DataTypes.STRING, noUpdate: true },
    },
    {
      sequelize,
      modelName: "Tracks",
    }
  );
  return Tracks;
};
