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
exports.GetUsersController = exports.QueryGetUsersSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.QueryGetUsersSchema = joi_1.default.object({
    filter: joi_1.default.string().min(1).max(30),
    page: joi_1.default.number().min(1).max(99999),
    pageSize: joi_1.default.number().max(100).min(1),
    sortField: joi_1.default.string().valid("id", "username", "name", "email"),
    sortDirection: joi_1.default.number().valid("asc", "desc"),
});
const defaultPagination = {
    page: 1,
    pageSize: 10,
    sortField: "id",
    sortDirection: "desc",
};
class GetUsersController {
    constructor(getUsersService) {
        this.getUsersService = getUsersService;
    }
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[GetUsersController] Buscando usuarios....");
            const query = Object.assign(Object.assign({}, defaultPagination), req.query);
            const [ok, users] = yield this.getUsersService.execute(query);
            if (!ok) {
                res.status(404).json({
                    status: false,
                    message: "Error en get de usuarios",
                });
                return;
            }
            console.log("[GetUsersController] Usuarios encontrados..");
            console.log(users);
            res.status(200).json({
                status: ok,
                data: { users },
            });
        });
    }
}
exports.GetUsersController = GetUsersController;
