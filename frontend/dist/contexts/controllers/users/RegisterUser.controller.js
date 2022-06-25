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
exports.BodyRegisterSchema = exports.RegisterUserController = void 0;
const joi_1 = __importDefault(require("joi"));
class RegisterUserController {
    constructor(registerUserService) {
        this.registerUserService = registerUserService;
    }
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [ok, user] = yield this.registerUserService.execute(req.body);
                if (!ok) {
                    res.status(404).json({
                        status: false,
                        message: "Error en creacion de usuario",
                    });
                    return;
                }
                res.status(200).json({
                    status: ok,
                    data: { user },
                });
            }
            catch (err) {
                console.log("[RegisterUsersController][Error]");
                console.log(err);
                res.status(500).json({
                    status: false,
                    message: "Error en creacion de usuario",
                });
            }
        });
    }
}
exports.RegisterUserController = RegisterUserController;
exports.BodyRegisterSchema = joi_1.default.object({
    id: joi_1.default.forbidden(),
    username: joi_1.default.string().alphanum().min(3).max(30).required(),
    password: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    passwordConfirmation: joi_1.default.any().valid(joi_1.default.ref("password")).required(),
    name: joi_1.default.string().alphanum().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
    street: joi_1.default.string(),
    city: joi_1.default.string(),
    zipcode: joi_1.default.string(),
    phone: joi_1.default.string(),
    website: joi_1.default.string(),
});
// export default new RegisterUserController();
