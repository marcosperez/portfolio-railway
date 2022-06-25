"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppServices = void 0;
const GetUsers_application_1 = require("./users/GetUsers.application");
const LoginUser_application_1 = require("./users/LoginUser.application");
const RegisterUser_application_1 = require("./users/RegisterUser.application");
class AppServices {
    constructor(respositories) {
        this.getUsersService = new GetUsers_application_1.GetUsersService(respositories.usersRepository);
        this.loginUserService = new LoginUser_application_1.LoginUserService(respositories.usersRepository);
        this.registerUserService = new RegisterUser_application_1.RegisterUserService(respositories.usersRepository);
    }
}
exports.AppServices = AppServices;
