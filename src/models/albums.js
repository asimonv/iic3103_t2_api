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
      Albums.hasMany(models.Tracks, {
        foreignKey: "album_id",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  Albums.init(
    {
      id: { type: DataTypes.STRING, noUpdate: true, primaryKey: true },
      artist_id: DataTypes.STRING,
      name: DataTypes.STRING,
      genre: DataTypes.STRING,
      artist: { type: DataTypes.STRING, noUpdate: true },
      tracks: { type: DataTypes.STRING, noUpdate: true },
      self: { type: DataTypes.STRING, noUpdate: true },
    },
    {
      sequelize,
      modelName: "Albums",
    }
  );
  return Albums;
};
