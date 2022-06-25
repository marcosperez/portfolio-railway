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
exports.User = void 0;
const UserContactData_domain_1 = require("./UserContactData.domain");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET || "secreto123?@";
class User {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.passwordHash = params.passwordHash;
        this.username = params.username;
        this.email = params.email;
        this.address = new UserContactData_domain_1.UserContactData(params.street, params.suite, params.city, params.zipcode, params.phone, params.website);
    }
    persistData() {
        var _a, _b, _c, _d, _e, _f;
        return {
            id: this.id || undefined,
            name: this.name,
            username: this.username,
            email: this.email,
            street: (_a = this.address) === null || _a === void 0 ? void 0 : _a.street,
            suite: (_b = this.address) === null || _b === void 0 ? void 0 : _b.suite,
            city: (_c = this.address) === null || _c === void 0 ? void 0 : _c.city,
            zipcode: (_d = this.address) === null || _d === void 0 ? void 0 : _d.zipcode,
            phone: (_e = this.address) === null || _e === void 0 ? void 0 : _e.phone,
            website: (_f = this.address) === null || _f === void 0 ? void 0 : _f.website,
            passwordHash: this.passwordHash,
        };
    }
    static toUserDTO(user) {
        var _a, _b, _c, _d, _e, _f;
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            street: (_a = user.address) === null || _a === void 0 ? void 0 : _a.street,
            suite: (_b = user.address) === null || _b === void 0 ? void 0 : _b.suite,
            city: (_c = user.address) === null || _c === void 0 ? void 0 : _c.city,
            zipcode: (_d = user.address) === null || _d === void 0 ? void 0 : _d.zipcode,
            phone: (_e = user.address) === null || _e === void 0 ? void 0 : _e.phone,
            website: (_f = user.address) === null || _f === void 0 ? void 0 : _f.website,
        };
    }
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, 10);
        });
    }
    static comparePassword(hash, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, hash);
        });
    }
    static generateJWT(payload) {
        console.log("tokenSecret: ", tokenSecret);
        return (0, jsonwebtoken_1.sign)(payload, tokenSecret, { expiresIn: "1800s" });
    }
}
exports.User = User;
