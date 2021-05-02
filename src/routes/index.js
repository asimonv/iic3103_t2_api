const KoaRouter = require("koa-router");
const artistRoutes = require("./artists");
const tracksRoutes = require("./tracks");
const albumsRoutes = require("./albums");

const router = new KoaRouter();

router.use("/artists", artistRoutes.routes());
router.use("/tracks", tracksRoutes.routes());
router.use("/albums", albumsRoutes.routes());

module.exports = router;
