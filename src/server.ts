import "dotenv/config";

import stoppable from "stoppable";
import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import session from "express-session";
import sessionFileStore from "session-file-store";
import sirv from "sirv";
import compression from "compression";
import { middleware } from "@sapper/server";

import "./routes/api/auth/_strategy";
import "./assets/css/theme.css";

const { SESSION_SECRET = "sketcheval", PORT = 3000, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const FileStore = sessionFileStore(session);

const app = express()
.use('/pdfs', sirv('pdfs', { dev }))
.use(
  bodyParser.json(),
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 31536000,
    },
    store: new FileStore({
      path: dev ? ".sessions" : `/tmp/sessions`,
    }),
  }),
  passport.initialize(),
  passport.session(),
  compression({ threshold: 0 }),
  sirv("static", { dev }),
  middleware({
    session: (req) => ({
      cycle: req.session?.cycle,
      user: req.session?.user,
    }),
  })
);

const server = stoppable(app.listen(PORT));
function shutdown() {
  server.stop((err) => {
    if (err) {
      console.log(err);
      process.exitCode = 1;
    }

    process.exit();
  });
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());
