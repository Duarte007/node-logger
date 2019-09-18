"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
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
const knexLOG = knex_1.default(logConnection);
exports.knexLOG = knexLOG;
//# sourceMappingURL=database.js.map