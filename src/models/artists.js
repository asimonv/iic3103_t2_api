module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define("Artists", {
    id: { type: DataTypes.STRING, noUpdate: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    albums: { type: DataTypes.STRING, noUpdate: true },
    tracks: { type: DataTypes.STRING, noUpdate: true },
    self: { type: DataTypes.STRING, noUpdate: true },
  });

  Artist.associate = models => {
    Artist.hasMany(models.Albums, {
      foreignKey: "artist_id",
      onDelete: "cascade",
      hooks: true,
    });
  };

  // 🥴
  Artist.prototype.getTracks = async function getTracks() {
    const artistAlbums = await this.getAlbums();
    const artistTracks = [];
    for (let i = 0; i < artistAlbums.length; i++) {
      const album = artistAlbums[i];
      artistTracks.push(...(await album.getTracks()));
    }

    return artistTracks;
  };

  return Artist;
};
