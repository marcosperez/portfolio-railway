"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorHeaders = exports.ValidatorQuery = exports.ValidatorBody = void 0;
const joi_1 = __importDefault(require("joi"));
const DefaultSchema = joi_1.default.object();
function Validator(type, schema = DefaultSchema) {
    return function (req, res, next) {
        const { error, value } = schema.validate(req[type]);
        console.log("[Validator][" + type + "] Validation");
        console.log(error);
        if (error !== undefined) {
            res.status(400).json({
                status: false,
                message: error === null || error === void 0 ? void 0 : error.message,
            });
            return;
        }
        req[type] = value;
        next();
    };
}
function ValidatorBody(schema = DefaultSchema) {
    return Validator("body", schema);
}
exports.ValidatorBody = ValidatorBody;
function ValidatorQuery(schema = DefaultSchema) {
    return Validator("query", schema);
}
exports.ValidatorQuery = ValidatorQuery;
function ValidatorHeaders(schema = DefaultSchema) {
    return Validator("headers", schema);
}
exports.ValidatorHeaders = ValidatorHeaders;
