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

router.get("track", "/:trackId", loadTrack, async ctx => {
  const {
    state: { track },
  } = ctx;
  ctx.body = track;
});

module.exports = router;
