"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const morgan_1 = __importDefault(require("morgan"));
const MorganLogFile = (0, morgan_1.default)("common", {
    stream: (0, fs_1.createWriteStream)("./access.log", { flags: "a" }),
});
const MorganLogConsole = (0, morgan_1.default)("combined");
exports.default = {
    MorganLogConsole,
    MorganLogFile,
};
