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
exports.BodyLoginSchema = exports.LoginUserController = void 0;
const joi_1 = __importDefault(require("joi"));
class LoginUserController {
    constructor(loginUserService) {
        this.loginUserService = loginUserService;
    }
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [ok, token] = yield this.loginUserService.execute(req.body);
                if (!ok) {
                    res.status(401).json({
                        status: false,
                        message: "Error en datos de login",
                    });
                    return;
                }
                res.status(200).json({
                    status: ok,
                    data: { token },
                });
            }
            catch (err) {
                console.log("[LoginUsersController][Error]");
                console.log(err);
                res.status(500).json({
                    status: false,
                    message: "Error en creacion de usuario",
                });
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
exports.BodyLoginSchema = joi_1.default.object({
    login: joi_1.default.string().required(),
    password: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
});
