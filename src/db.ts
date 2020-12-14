const {
  // Admissions DB
  DB_CLIENT = "mysql2",
  DB_HOST = "localhost",
  DB_DATABASE = "elentra_adm",
  DB_USER = "elentra",
  DB_PASSWORD = "password",

  // Auth DB
  DB_AUTH_CLIENT = "mysql2",
  DB_AUTH_HOST = "localhost",
  DB_AUTH_DATABASE = "elentra_auth",
  DB_AUTH_USER = "elentra",
  DB_AUTH_PASSWORD = "password",
} = process.env;

export const admissions = require("knex")({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
  },
});

export const auth = require("knex")({
  client: DB_AUTH_CLIENT,
  connection: {
    host: DB_AUTH_HOST,
    database: DB_AUTH_DATABASE,
    user: DB_AUTH_USER,
    password: DB_AUTH_PASSWORD,
  },
});
