"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRepositories = void 0;
const User_repository_1 = require("./users/User.repository");
class AppRepositories {
    constructor(primaClient) {
        this.usersRepository = new User_repository_1.UserRepository(primaClient);
    }
}
exports.AppRepositories = AppRepositories;
