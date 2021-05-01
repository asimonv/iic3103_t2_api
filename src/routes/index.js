const KoaRouter = require("koa-router");
const artistRoutes = require("./artists");

const router = new KoaRouter();

router.use("/artists", artistRoutes.routes());

module.exports = router;
