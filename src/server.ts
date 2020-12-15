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

const { SESSION_SECRET = "sketcheval", PORT = 3000, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const FileStore = sessionFileStore(session);

const app = express()
  .use("/pdfs", sirv("pdfs", { dev, extensions: ["pdf"] }))
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
        // @ts-expect-error: Cycle not defined on session.
        cycle: req.session?.cycle,
        // @ts-expect-error: User not defined on session.
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
