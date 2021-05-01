const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.get("artists", "/", async ctx => {
  const artists = await ctx.orm.artists.findAll();
  ctx.body = artists;
});

module.exports = router;
