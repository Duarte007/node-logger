import Knex from "knex";

const logConnection = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST_LOG,
    port: process.env.DB_PORT,
    database: process.env.DB_LOGNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  pool: {
    min: 2,
    max: 10
  }
};

const knexLOG: Knex = Knex(logConnection as Knex.Config);

export { knexLOG };
