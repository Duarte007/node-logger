"use strict";
exports.__esModule = true;
var knex_1 = require("knex");
var logConnection = {
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
var knexLOG = knex_1["default"](logConnection);
exports.knexLOG = knexLOG;
