"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validation_1 = require("../Validation");
const GetUsers_controller_1 = require("./GetUsers.controller");
const LoginUser_controller_1 = require("./LoginUser.controller");
const RegisterUser_controller_1 = require("./RegisterUser.controller");
function createUserRoutes(services, repositories) {
    var router = (0, express_1.Router)();
    const getUsersController = new GetUsers_controller_1.GetUsersController(services.getUsersService);
    const registerUserController = new RegisterUser_controller_1.RegisterUserController(services.registerUserService);
    const loginUserController = new LoginUser_controller_1.LoginUserController(services.loginUserService);
    router.get("/", (0, Validation_1.ValidatorQuery)(GetUsers_controller_1.QueryGetUsersSchema), (0, Validation_1.ValidatorHeaders)(), (0, Validation_1.ValidatorBody)(), (req, res) => getUsersController.handler(req, res));
    router.post("/register", (0, Validation_1.ValidatorQuery)(), (0, Validation_1.ValidatorHeaders)(), (0, Validation_1.ValidatorBody)(RegisterUser_controller_1.BodyRegisterSchema), (req, res) => registerUserController.handler(req, res));
    router.post("/Login", (0, Validation_1.ValidatorQuery)(), (0, Validation_1.ValidatorHeaders)(), (0, Validation_1.ValidatorBody)(LoginUser_controller_1.BodyLoginSchema), (req, res) => loginUserController.handler(req, res));
    return router;
}
exports.default = createUserRoutes;
