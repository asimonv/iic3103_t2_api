const KoaRouter = require("koa-router");
const tracksRouter = require("./tracks");

const router = new KoaRouter();

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
    const album = await artist.getAlbums({ where: { name } });
    if (album) {
      ctx.status = 409;
    } else {
      try {
        const { id: artistId } = artist;
        const id = btoa(`${name}:${artistId}`).slice(0, 22);

        ctx.status = 201;
        ctx.body = await ctx.orm.Albums.create({ ...body, id });
      } catch (error) {
        ctx.body = error;
      }
    }
  }
});

router.get("album", "/:albumId", loadAlbum, async ctx => {
  const {
    state: { album },
  } = ctx;
  ctx.body = album;
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
