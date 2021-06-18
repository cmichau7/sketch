const {
  // Admissions DB
  DB_CLIENT = "mysql2",
  DB_HOST = "137.122.238.121",
  DB_DATABASE = "elentra_adm",
  DB_USER = "admissions",
  DB_PASSWORD = "kjaef*@Y#GG2gdoudKh",

  // Auth DB
  DB_AUTH_CLIENT = "mysql2",
  DB_AUTH_HOST = "137.122.238.121",
  DB_AUTH_DATABASE = "elentra_adm_auth",
  DB_AUTH_USER ="admissions",
  DB_AUTH_PASSWORD = "kjaef*@Y#GG2gdoudKh",
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
