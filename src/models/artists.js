module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define("Artists", {
    name: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
  });

  Artist.associate = models => {
    Artist.hasMany(models.Albums, { foreignKey: "artist_id" });
  };

  // 🥴
  Artist.prototype.getTracks = async function getTracks() {
    const artistAlbums = await this.getAlbums();
    const artistTracks = [];
    for (let i = 0; i < artistAlbums.length; i++) {
      const album = artistAlbums[i];
      artistTracks.push(await album.getTracks());
    }

    return artistTracks;
  };

  return Artist;
};
