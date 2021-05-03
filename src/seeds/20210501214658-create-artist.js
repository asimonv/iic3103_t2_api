const faker = require("faker");
const btoa = require("btoa");

const BASE_URL = "https://jumping-grasshopper-t2.herokuapp.com";

module.exports = {
  up: async queryInterface => {
    const artistsData = [];
    const albumsData = [];
    const tracksData = [];
    for (let i = 0; i < 10; i += 1) {
      const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const artist_id = btoa(name).slice(0, 22);
      artistsData.push({
        id: artist_id,
        name,
        age: Math.floor(Math.random() * (80 - 16) + 16),
        createdAt: new Date(),
        updatedAt: new Date(),
        albums: `${BASE_URL}/artists/${artist_id}/albums`,
        tracks: `${BASE_URL}/tracks/${artist_id}/tracks`,
        self: `${BASE_URL}/artists/${artist_id}`,
      });

      for (let j = 0; j < 3; j++) {
        const albumName = `${faker.vehicle.manufacturer()} ${faker.lorem.word()}`;
        const album_id = btoa(`${albumName}:${artist_id}`).slice(0, 22);
        albumsData.push({
          id: album_id,
          artist_id,
          name: albumName,
          genre: faker.music.genre(),
          createdAt: new Date(),
          updatedAt: new Date(),
          artist: `${BASE_URL}/artists/${artist_id}`,
          tracks: `${BASE_URL}/albums/${album_id}/tracks`,
          self: `${BASE_URL}/albums/${album_id}`,
        });

        for (let k = 0; k < 8; k++) {
          const trackName = faker.lorem.sentence();
          const track_id = btoa(`${trackName}:${album_id}`).slice(0, 22);
          tracksData.push({
            id: track_id,
            album_id,
            name: trackName,
            duration: Math.random() * (5 - 1) + 1,
            times_played: Math.floor(Math.random() * (120 - 1) + 1) * 100,
            createdAt: new Date(),
            updatedAt: new Date(),
            album: `${BASE_URL}/albums/${album_id}`,
            artist: `${BASE_URL}/artist/${artist_id}`,
            self: `${BASE_URL}/tracks/${track_id}`,
          });
        }
      }
    }
    try {
      await queryInterface.bulkInsert("Artists", artistsData);
    } catch (error) {
      console.warn("artist error");
    }

    try {
      await queryInterface.bulkInsert("Albums", albumsData);
    } catch (error) {
      console.warn("albums error" + error);
    }

    try {
      await queryInterface.bulkInsert("Tracks", tracksData);
    } catch (error) {
      console.warn("tracks error" + error);
    }
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete("Artists", null, {});
    await queryInterface.bulkDelete("Albums", null, {});
    await queryInterface.bulkDelete("Tracks", null, {});
  },
};
