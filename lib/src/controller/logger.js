"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const moment_1 = __importDefault(require("moment"));
class Logger {
    constructor(tableName) {
        this.ERROR_LOG = 'ERROR';
        this.DEBUG_LOG = 'DEBUG';
        this.INFO_LOG = 'INFO';
        this.FULL_LOG = 'FULL';
        this.WARN_LOG = 'WARN';
        this.REGISTER_IN_DB = 0;
        this.REGISTER_IN_CONSOLE = 1;
        this.REGISTER_IN_BOTH = 2;
        this.buildDataLog = (dataLog, levelLog) => {
            let { res, result, status, query, report } = dataLog;
            let infoLog = {};
            infoLog = { date: moment_1.default().format('DD/MM/YYYY HH:mm:ss') };
            if (res) {
                let { originalUrl } = res.req;
                const infoApi = {
                    userId: res.req.userId ? res.req.userId : 0,
                    method: res.req.method,
                    endpoint: originalUrl
                };
                infoLog = Object.assign({}, infoLog, infoApi);
            }
            if (result) {
                const response = {
                    response: JSON.stringify(result)
                };
                infoLog = Object.assign({}, infoLog, response);
            }
            if (status) {
                infoLog = Object.assign({}, infoLog, { status });
            }
            if (query) {
                infoLog = Object.assign({}, infoLog, { query });
            }
            if (report) {
                const fullReport = {
                    report: JSON.stringify(report)
                };
                infoLog = Object.assign({}, infoLog, fullReport);
            }
            const data = {
                lvlLog: levelLog,
                log: JSON.stringify(infoLog)
            };
            return data;
        };
        this.tableName = tableName || "systemLog";
    }
    ;
    error(dataLog, registerIn = this.REGISTER_IN_DB) {
        const data = this.buildDataLog(dataLog, this.ERROR_LOG);
        this.registerLog(registerIn, data);
    }
    ;
    warn(dataLog, registerIn = this.REGISTER_IN_DB) {
        if (this.WARN_LOG === process.env.LVL_LOG || process.env.LVL_LOG === 'FULL') {
            const data = this.buildDataLog(dataLog, this.WARN_LOG);
            this.registerLog(registerIn, data);
        }
    }
    ;
    info(dataLog, registerIn = this.REGISTER_IN_DB) {
        if (this.INFO_LOG === process.env.LVL_LOG || process.env.LVL_LOG === 'FULL') {
            const data = this.buildDataLog(dataLog, this.INFO_LOG);
            this.registerLog(registerIn, data);
        }
    }
    ;
    debug(dataLog, registerIn = this.REGISTER_IN_DB) {
        if (this.DEBUG_LOG === process.env.LVL_LOG || process.env.LVL_LOG === 'FULL') {
            const data = this.buildDataLog(dataLog, this.DEBUG_LOG);
            this.registerLog(registerIn, data);
        }
    }
    ;
    registerLog(registerIn, data) {
        if (registerIn === 0) {
            this.saveLogInDataBase(data, this.tableName);
        }
        else if (registerIn === 1) {
            this.saveLogInConsole(data);
        }
        else {
            this.saveLogInConsole(data);
            this.saveLogInDataBase(data, this.tableName);
        }
    }
    ;
    saveLogInDataBase(data, tableName) {
        database_1.knexLOG(tableName)
            .insert(data)
            .then(success => {
            console.log("Log salvo com sucesso!");
            console.log(success);
        }).catch(error => {
            console.log("Error ao salvar log.");
            console.log(error);
        });
    }
    ;
    saveLogInConsole(data) {
        console.log('======== LOG ========');
        console.log(data);
    }
    ;
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map