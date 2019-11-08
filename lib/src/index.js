"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./controller/logger"));
const Log = new logger_1.default('lognerusapi');
console.log(Log);
exports.default = logger_1.default;
//# sourceMappingURL=index.js.map