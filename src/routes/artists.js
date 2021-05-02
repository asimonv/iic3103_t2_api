const btoa = require("btoa");
const KoaRouter = require("koa-router");
const { Op } = require("sequelize");
const albumsRouter = require("./albums");
const tracksRouter = require("./tracks");

const router = new KoaRouter();

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
  ctx.body = artist;
});

router.post("createArtist", "/", async ctx => {
  const {
    request: {
      body: { id, name },
      body,
    },
  } = ctx;
  const artist = ctx.orm.Artists.findAll({
    where: {
      [Op.or]: [{ id }, { name }],
    },
  });

  if (artist) {
    ctx.status = 409;
    ctx.body = artist;
  } else {
    try {
      const id = btoa(name).slice(0, 22);
      ctx.status = 201;
      ctx.body = await ctx.orm.Artists.create({ ...body, id });
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
      ctx.status = 201;
    } catch (error) {
      ctx.body = error;
    }
  }
});

router.use("/:artistId/albums", loadArtist, albumsRouter.routes());

router.use("/:artistId/tracks", loadArtist, tracksRouter.routes());

module.exports = router;
