const btoa = require("btoa");
const KoaRouter = require("koa-router");
const tracksRouter = require("./tracks");

const router = new KoaRouter();
const BASE_URL = "https://jumping-grasshopper-t2.herokuapp.com";

async function loadAlbum(ctx, next) {
  const {
    params: { albumId },
  } = ctx;
  const album = await ctx.orm.Albums.findByPk(albumId);
  ctx.state.album = album;
  return next();
}

router.get("albums", "/", async ctx => {
  const {
    state: { artist },
  } = ctx;

  if (artist) {
    const artistAlbums = await artist.getAlbums();
    ctx.body = artistAlbums;
  } else {
    const allAlbums = await ctx.orm.Albums.findAll();
    ctx.body = allAlbums;
  }
});

router.post("createAlbum", "/", async ctx => {
  const {
    state: { artist },
    request: {
      body: { name },
      body,
    },
  } = ctx;

  if (!artist) {
    ctx.status = 422;
  } else {
    const album = await artist.getAlbums({
      where: { name },
      limit: 1,
    });
    if (album.length) {
      ctx.status = 409;
      ctx.body = album[0];
    } else {
      try {
        const { id: artistId } = artist;
        const id = btoa(`${name}:${artistId}`).slice(0, 22);
        const albumBody = {
          ...body,
          id,
          artist_id: artistId,
          artist: `${BASE_URL}/artists/${artistId}`,
          tracks: `${BASE_URL}/albums/${id}/tracks`,
          self: `${BASE_URL}/albums/${id}`,
        };
        ctx.status = 201;
        ctx.body = await ctx.orm.Albums.create(albumBody);
      } catch (error) {
        ctx.status = 400;
      }
    }
  }
});

router.get("album", "/:albumId", loadAlbum, async ctx => {
  const {
    state: { album },
  } = ctx;
  if (!album) {
    ctx.status = 404;
  } else {
    ctx.status = 200;
    ctx.body = album;
  }
});

router.delete("deleteAlbum", "/:albumId", loadAlbum, async ctx => {
  const {
    state: { album },
  } = ctx;
  if (!album) {
    ctx.status = 404;
  } else {
    try {
      await album.destroy();
      ctx.status = 204;
    } catch (error) {
      ctx.body = error;
    }
  }
});

router.put("playAllAlbumTracks", "/play", async ctx => {
  const {
    state: { artist },
  } = ctx;

  if (!artist) {
    ctx.status = 404;
  } else {
    try {
      const albums = await artist.getAlbums();
      for (let i = 0; i < albums.length; i++) {
        const { id: albumId } = albums[i];
        await ctx.orm.Tracks.increment("times_played", {
          where: { album_id: albumId },
        });
      }
      ctx.state = 200;
    } catch (error) {
      ctx.body = error;
    }
  }
});

router.use("/:albumId/tracks", loadAlbum, tracksRouter.routes());

module.exports = router;
