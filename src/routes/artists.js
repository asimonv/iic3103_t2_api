const btoa = require("btoa");
const KoaRouter = require("koa-router");
const { Op } = require("sequelize");
const albumsRouter = require("./albums");
const tracksRouter = require("./tracks");

const router = new KoaRouter();
const BASE_URL = "https://jumping-grasshopper-t2.herokuapp.com";

async function loadArtist(ctx, next) {
  const {
    params: { artistId },
  } = ctx;
  const artist = await ctx.orm.Artists.findByPk(artistId);
  ctx.state.artist = artist;
  return next();
}

router.get("artists", "/", async ctx => {
  const artists = await ctx.orm.Artists.findAll();
  ctx.body = artists;
});

router.get("artists", "/:artistId", loadArtist, async ctx => {
  const {
    state: { artist },
  } = ctx;
  if (!artist) {
    ctx.status = 404;
  } else {
    ctx.status = 200;
    ctx.body = artist;
  }
});

router.post("createArtist", "/", async ctx => {
  const {
    request: { body: { name } = {}, body },
  } = ctx;
  const artist = await ctx.orm.Artists.findAll({
    where: { name: name || null },
    limit: 1,
  });

  if (artist.length) {
    ctx.status = 409;
    ctx.body = artist[0];
  } else {
    try {
      const id = btoa(name).slice(0, 22);
      const artistBody = {
        ...body,
        id,
        albums: `${BASE_URL}/artists/${id}/albums`,
        tracks: `${BASE_URL}/artists/${id}/tracks`,
        self: `${BASE_URL}/artists/${id}`,
      };
      ctx.body = await ctx.orm.Artists.create(artistBody);
      ctx.status = 201;
    } catch (error) {
      ctx.status = 400;
    }
  }
});

router.delete("deleteArtist", "/:artistId", loadArtist, async ctx => {
  const {
    state: { artist },
  } = ctx;
  if (!artist) {
    ctx.status = 404;
  } else {
    try {
      await artist.destroy();
      ctx.status = 204;
    } catch (error) {
      ctx.body = error;
    }
  }
});

router.use("/:artistId/albums", loadArtist, albumsRouter.routes());

router.use("/:artistId/tracks", loadArtist, tracksRouter.routes());

module.exports = router;
