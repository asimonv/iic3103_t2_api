"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Albums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Albums.hasMany(models.Tracks, { foreignKey: "album_id" });
    }
  }
  Albums.init(
    {
      artist_id: DataTypes.STRING,
      name: DataTypes.STRING,
      genre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Albums",
    }
  );
  return Albums;
};
