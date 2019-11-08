"use strict";
exports.__esModule = true;
var config = {
    levelLog: process.env.LVL_LOG ? process.env.LVL_LOG : 'ALL',
    timezone: process.env.TIMEZONE ? process.env.TIMEZONE : 'America/Sao_Paulo',
    log_database: {
        host: process.env.DB_HOST_LOG ? process.env.DB_HOST_LOG : '',
        port: process.env.DB_PORT_LOG ? process.env.DB_PORT_LOG : '',
        user: process.env.DB_USER_LOG ? process.env.DB_USER_LOG : '',
        password: process.env.DB_PASS_LOG ? process.env.DB_PASS_LOG : '',
        name: process.env.DB_NAME_LOG ? process.env.DB_NAME_LOG : ''
    }
};
exports["default"] = config;
