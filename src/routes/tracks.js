const KoaRouter = require("koa-router");

const router = new KoaRouter();

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
  } else {
    const allTracks = await ctx.orm.Tracks.findAll();
    ctx.body = allTracks;
  }
});

router.post("createTrack", "/", async => {
  const {
    state: { album },
    request: { body: { name }, body }
  } = ctx;

  if (!album) {
    ctx.status = 422; 
  } else {
    const track = await album.getTracks({ where: { name }})[0];
      if (track) {
        ctx.body = track
        ctx.status = 409
      } else {
        try {
          const { id: albumId } = album;
          const id = btoa(`${name}:${albumId}`).slice(0, 22);
          ctx.status = 201;
          ctx.body = await ctx.orm.Tracks.create({ ...body, id });
        } catch (error) {
          ctx.status = 400;
        }
      }
  }
});

router.get("track", "/:trackId", loadTrack, async ctx => {
  const {
    state: { track },
  } = ctx;
  ctx.body = track;
});

module.exports = router;
