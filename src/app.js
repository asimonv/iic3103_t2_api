import Koa from "koa";
import koaBody from "koa-body";
import koaLogger from "koa-logger";
import routes from "./routes";
import orm from "./models";

// App constructor
const app = new Koa();

// expose ORM through context's prototype
app.context.orm = orm;

/**
 * Middlewares
 */

// expose running mode in ctx.state
app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  return next();
});

// log requests
app.use(koaLogger());

// parse request body
app.use(
  koaBody({
    multipart: true,
    keepExtensions: true,
  })
);

// Routing middleware
app.use(routes.routes());

app.use((ctx, next) => {
  ctx.status = 455;
  return next();
});

module.exports = app;
