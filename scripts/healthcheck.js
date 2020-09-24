const { request } = require("http");

const { HOST = "0.0.0.0", PORT = "3333" } = process.env;

const opts = {
  host: HOST,
  port: PORT,
  path: "/",
  timeout: 2000
};

const req = request(opts, async res => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode !== 200) {
    process.exitCode = 1;
  }

  process.exit();
});

req.on("error", async err => {
  console.log(`ERROR: ${err}`);
  process.exit(1);
});

req.end();
