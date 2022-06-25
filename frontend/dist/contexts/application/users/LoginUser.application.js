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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserService = void 0;
const User_domain_1 = require("../../domain/users/User.domain");
class LoginUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userLoginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByUsername(userLoginData.login);
            if (!user) {
                console.log("[LoginUserService] Usuario no encontrado");
                return [false, undefined];
            }
            if (!(yield User_domain_1.User.comparePassword(user.passwordHash, userLoginData.password))) {
                console.log("[LoginUserService] Hash diferente ", user.passwordHash);
                return [false, undefined];
            }
            const tokenJWT = User_domain_1.User.generateJWT({ username: userLoginData.login });
            console.log("[LoginUserService] JWT generado exitosamente");
            return [true, { token: tokenJWT }];
        });
    }
}
exports.LoginUserService = LoginUserService;
