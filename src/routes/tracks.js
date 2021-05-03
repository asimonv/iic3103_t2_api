const btoa = require("btoa");
const KoaRouter = require("koa-router");

const router = new KoaRouter();
const BASE_URL = "https://jumping-grasshopper-t2.herokuapp.com";

async function loadTrack(ctx, next) {
  const {
    params: { trackId },
  } = ctx;
  const track = await ctx.orm.Tracks.findByPk(trackId);
  ctx.state.track = track;
  return next();
}

router.get("tracks", "/", async ctx => {
  const {
    state: { artist, album },
  } = ctx;

  if (artist) {
    const artistTracks = await artist.getTracks();
    ctx.body = artistTracks;
  } else if (album) {
    const albumTracks = await album.getTracks();
    ctx.body = albumTracks;
  } else if (ctx.path === "/tracks") {
    const allTracks = await ctx.orm.Tracks.findAll();
    ctx.body = allTracks;
  } else {
    ctx.status = 404;
  }
});

router.post("createTrack", "/", async ctx => {
  const {
    state: { album },
    request: {
      body: { name, duration },
      body,
    },
  } = ctx;

  if (
    typeof name !== "string" ||
    typeof duration !== "number" ||
    Number.isInteger(duration)
  ) {
    ctx.status = 400;
  } else {
    if (!album) {
      ctx.status = 422;
    } else {
      const track = await album.getTracks({
        where: { name: name || null },
        limit: 1,
      });
      if (track.length) {
        ctx.body = track[0];
        ctx.status = 409;
      } else {
        try {
          const { id: albumId, artist_id: artistId } = album;
          const id = btoa(`${name}:${albumId}`).slice(0, 22);
          const trackBody = {
            ...body,
            id,
            album_id: albumId,
            artist: `${BASE_URL}/artists/${artistId}`,
            album: `${BASE_URL}/albums/${albumId}`,
            self: `${BASE_URL}/tracks/${id}`,
          };

          ctx.status = 201;
          ctx.body = await ctx.orm.Tracks.create(trackBody);
        } catch (error) {
          ctx.status = 400;
        }
      }
    }
  }
});

router.get("track", "/:trackId", loadTrack, async ctx => {
  const {
    state: { track },
  } = ctx;
  if (!track) {
    ctx.status = 404;
  } else {
    ctx.status = 200;
    ctx.body = track;
  }
});

router.put("playTrack", "/:trackId/play", loadTrack, async ctx => {
  const {
    state: { track },
  } = ctx;

  if (!track) {
    ctx.status = 404;
  } else {
    try {
      await track.increment("times_played");
      ctx.status = 200;
    } catch (error) {
      ctx.body = error;
    }
  }
});

router.put("playAlbumTracks", "/play", async ctx => {
  const {
    state: { album },
  } = ctx;

  if (album) {
    const albumTracks = await album.getTracks();
    for (let i = 0; i < albumTracks.length; i++) {
      const track = albumTracks[i];
      await track.increment("times_played");
    }
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }
});

router.delete("deleteTrack", "/:trackId", loadTrack, async ctx => {
  const {
    state: { track },
  } = ctx;
  if (!track) {
    ctx.status = 404;
  } else {
    try {
      await track.destroy();
      ctx.status = 204;
    } catch (error) {
      ctx.body = error;
    }
  }
});

module.exports = router;
