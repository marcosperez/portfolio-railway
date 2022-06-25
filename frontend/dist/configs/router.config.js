"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigAppRouter = void 0;
const Users_router_1 = __importDefault(require("../contexts/controllers/users/Users.router"));
function ConfigAppRouter(app, services, repositories) {
    const usersRouter = (0, Users_router_1.default)(services, repositories);
    app.use("/users", usersRouter);
}
exports.ConfigAppRouter = ConfigAppRouter;
