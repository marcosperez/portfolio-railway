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
exports.RegisterUserService = void 0;
const User_domain_1 = require("../../domain/users/User.domain");
class RegisterUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userRegisterData) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield User_domain_1.User.hashPassword(userRegisterData.password);
            const newUser = new User_domain_1.User(Object.assign({ id: undefined, passwordHash }, userRegisterData));
            const dbUser = yield this.userRepository.create(newUser);
            return [true, dbUser];
        });
    }
}
exports.RegisterUserService = RegisterUserService;
