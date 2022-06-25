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
exports.GetUsersService = void 0;
const User_domain_1 = require("../../domain/users/User.domain");
class GetUsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find(query);
            const countUsers = yield this.userRepository.count(query);
            const page = {
                list: users.map((u) => User_domain_1.User.toUserDTO(u)),
                count: countUsers,
            };
            return [true, page];
        });
    }
}
exports.GetUsersService = GetUsersService;
