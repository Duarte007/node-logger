import Knex from "knex";

const logConnection = {
  client: "mysql",
  connection: {
    host: process.env.DB_LOG_HOST,
    port: process.env.DB_LOG_PORT,
    database: process.env.DB_LOG_NAME,
    user: process.env.DB_LOG_USER,
    password: process.env.DB_LOG_PASS
  },
  pool: {
    min: 2,
    max: 10
  }
};

const knexLOG: Knex = Knex(logConnection as Knex.Config);

export { knexLOG };
