"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var config_1 = require("../config");
var database_1 = require("../config/database");
var moment_timezone_1 = require("moment-timezone");
var Logger = /** @class */ (function () {
    function Logger(tableName) {
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
        this.buildDataLog = function (dataLog, levelLog) {
            var res = dataLog.res, result = dataLog.result, status = dataLog.status, query = dataLog.query, report = dataLog.report;
            var infoLog = {};
            var endpoint = '';
            infoLog = { date: moment_timezone_1["default"]().tz(config_1["default"].timezone).format('DD/MM/YYYY HH:mm:ss') };
            if (res) {
                var originalUrl = res.req.originalUrl;
                var infoApi = {
                    userId: res.req.userId ? res.req.userId : 0,
                    method: res.req.method,
                    endpoint: originalUrl
                };
                endpoint = originalUrl;
                infoLog = __assign({}, infoLog, infoApi);
            }
            if (result) {
                var response = {
                    response: typeof result == 'object' && result.hasOwnProperty('stack') ? result.toString() : JSON.stringify(result)
                };
                infoLog = __assign({}, infoLog, response);
            }
            if (status) {
                infoLog = __assign({}, infoLog, { status: status });
            }
            if (query) {
                infoLog = __assign({}, infoLog, { query: query });
            }
            if (report) {
                var fullReport = {
                    report: report
                };
                infoLog = __assign({}, infoLog, fullReport);
            }
            if (endpoint !== '') {
                var data_1 = {
                    lvlLog: levelLog,
                    log: infoLog,
                    endpoint: endpoint
                };
                return data_1;
            }
            var data = {
                lvlLog: levelLog,
                log: infoLog
            };
            return data;
        };
        this.tableName = tableName || 'systemLog';
    }
    Logger.prototype.error = function (dataLog, registerIn) {
        if (registerIn === void 0) { registerIn = this.REGISTER_IN_DB; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.buildDataLog(dataLog, this.ERROR_LOG);
                        return [4 /*yield*/, this.registerLog(registerIn, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Logger.prototype.warn = function (dataLog, registerIn) {
        if (registerIn === void 0) { registerIn = this.REGISTER_IN_DB; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.WARN_LOG === config_1["default"].levelLog || config_1["default"].levelLog === 'FULL')) return [3 /*break*/, 2];
                        data = this.buildDataLog(dataLog, this.WARN_LOG);
                        return [4 /*yield*/, this.registerLog(registerIn, data)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Logger.prototype.info = function (dataLog, registerIn) {
        if (registerIn === void 0) { registerIn = this.REGISTER_IN_DB; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.INFO_LOG === config_1["default"].levelLog || config_1["default"].levelLog === 'FULL')) return [3 /*break*/, 2];
                        data = this.buildDataLog(dataLog, this.INFO_LOG);
                        return [4 /*yield*/, this.registerLog(registerIn, data)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Logger.prototype.debug = function (dataLog, registerIn) {
        if (registerIn === void 0) { registerIn = this.REGISTER_IN_DB; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.DEBUG_LOG === config_1["default"].levelLog || config_1["default"].levelLog === 'FULL')) return [3 /*break*/, 2];
                        data = this.buildDataLog(dataLog, this.DEBUG_LOG);
                        return [4 /*yield*/, this.registerLog(registerIn, data)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Logger.prototype.registerLog = function (registerIn, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(registerIn === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.saveLogInDataBase(this.stringifyData(data), this.tableName)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(registerIn === 1)) return [3 /*break*/, 3];
                        this.saveLogInConsole(data);
                        return [3 /*break*/, 5];
                    case 3:
                        this.saveLogInConsole(data);
                        return [4 /*yield*/, this.saveLogInDataBase(this.stringifyData(data), this.tableName)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Logger.prototype.saveLogInDataBase = function (data, tableName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.knexLOG(tableName)
                            .insert(data)
                            .then(function (success) {
                            console.log(_this.GREEN, "[" + success + "] Log salvo com sucesso no banco " + config_1["default"].log_database.name + "!");
                        })["catch"](function (error) {
                            console.log(_this.RED, '\n [ERRO] Error ao salvar log. \n');
                            console.log(error);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Logger.prototype.stringifyData = function (data) {
        return __assign({}, data, { log: JSON.stringify(data.log) });
    };
    Logger.prototype.saveLogInConsole = function (data) {
        console.log(this.YELLOW, '[LOGGER] [   ================ LOG ================   ]');
        console.log(data);
    };
    return Logger;
}());
exports["default"] = Logger;
