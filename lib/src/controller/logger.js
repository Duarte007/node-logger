"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const database_1 = require("../config/database");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
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
        this.YELLOW = '\x1b[33m%s\x1b[0m';
        this.RED = '\x1b[31m%s\x1b[0m';
        this.GREEN = '\x1b[32m%s\x1b[0m';
        this.buildDataLog = (dataLog, levelLog) => {
            let { res, result, status, query, report } = dataLog;
            let infoLog = {};
            let endpoint = '';
            infoLog = { date: moment_timezone_1.default().tz(config_1.default.timezone).format('DD/MM/YYYY HH:mm:ss') };
            if (res) {
                let { originalUrl } = res.req;
                const infoApi = {
                    userId: res.req.userId ? res.req.userId : 0,
                    method: res.req.method,
                    endpoint: originalUrl
                };
                endpoint = originalUrl;
                infoLog = Object.assign(Object.assign({}, infoLog), infoApi);
            }
            if (result) {
                const response = {
                    response: typeof result == 'object' && result.hasOwnProperty('stack') ? result.toString() : JSON.stringify(result)
                };
                infoLog = Object.assign(Object.assign({}, infoLog), response);
            }
            if (status) {
                infoLog = Object.assign(Object.assign({}, infoLog), { status });
            }
            if (query) {
                infoLog = Object.assign(Object.assign({}, infoLog), { query });
            }
            if (report) {
                const fullReport = {
                    report: report
                };
                infoLog = Object.assign(Object.assign({}, infoLog), fullReport);
            }
            if (endpoint !== '') {
                const data = {
                    lvlLog: levelLog,
                    log: infoLog,
                    endpoint
                };
                return data;
            }
            const data = {
                lvlLog: levelLog,
                log: infoLog
            };
            return data;
        };
        this.tableName = tableName || 'systemLog';
    }
    error(dataLog, registerIn = this.REGISTER_IN_DB) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.buildDataLog(dataLog, this.ERROR_LOG);
            yield this.registerLog(registerIn, data);
        });
    }
    warn(dataLog, registerIn = this.REGISTER_IN_DB) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.WARN_LOG === config_1.default.levelLog || config_1.default.levelLog === 'FULL') {
                const data = this.buildDataLog(dataLog, this.WARN_LOG);
                yield this.registerLog(registerIn, data);
            }
        });
    }
    info(dataLog, registerIn = this.REGISTER_IN_DB) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.INFO_LOG === config_1.default.levelLog || config_1.default.levelLog === 'FULL') {
                const data = this.buildDataLog(dataLog, this.INFO_LOG);
                yield this.registerLog(registerIn, data);
            }
        });
    }
    debug(dataLog, registerIn = this.REGISTER_IN_DB) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.DEBUG_LOG === config_1.default.levelLog || config_1.default.levelLog === 'FULL') {
                const data = this.buildDataLog(dataLog, this.DEBUG_LOG);
                yield this.registerLog(registerIn, data);
            }
        });
    }
    registerLog(registerIn, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (registerIn === 0) {
                yield this.saveLogInDataBase(this.stringifyData(data), this.tableName);
            }
            else if (registerIn === 1) {
                this.saveLogInConsole(data);
            }
            else {
                this.saveLogInConsole(data);
                yield this.saveLogInDataBase(this.stringifyData(data), this.tableName);
            }
        });
    }
    saveLogInDataBase(data, tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.knexLOG(tableName)
                .insert(data)
                .then((success) => {
                console.log(this.GREEN, `[${success}] Log salvo com sucesso no banco ${config_1.default.log_database.name}!`);
            })
                .catch((error) => {
                console.log(this.RED, '\n [ERRO] Error ao salvar log. \n');
                console.log(error);
            });
        });
    }
    stringifyData(data) {
        return Object.assign(Object.assign({}, data), { log: JSON.stringify(data.log) });
    }
    saveLogInConsole(data) {
        console.log(this.YELLOW, '[LOGGER] [   ================ LOG ================   ]');
        console.log(data);
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map