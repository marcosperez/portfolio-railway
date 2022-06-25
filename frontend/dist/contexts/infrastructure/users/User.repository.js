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
exports.UserRepository = void 0;
const User_domain_1 = require("../../domain/users/User.domain");
const client_1 = require("@prisma/client");
class UserRepository {
    constructor(client = new client_1.PrismaClient()) {
        this.prisma = client;
    }
    // Default repository methods
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.users.findFirst({ where: { id: id } });
            return user ? new User_domain_1.User(user) : null;
        });
    }
    find(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (where.page - 1) * where.pageSize;
            const whereQuery = this.buildFindWhereFilter(where);
            const query = {
                where: whereQuery,
                take: where.pageSize,
                skip: skip,
            };
            const allUsers = yield this.prisma.users.findMany(query);
            return allUsers.map((dbUser) => new User_domain_1.User(dbUser));
        });
    }
    count(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereQuery = this.buildFindWhereFilter(where);
            const totalUsers = yield this.prisma.users.count({ where: whereQuery });
            return totalUsers;
        });
    }
    update(id, user) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbUser = yield this.prisma.users.create({ data: user.persistData() });
            return new User_domain_1.User(dbUser);
        });
    }
    // Custom methods
    findByUsername(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                where: {
                    username: login,
                },
            };
            const user = yield this.prisma.users.findFirst(where);
            return user ? new User_domain_1.User(user) : null;
        });
    }
    // Private methods
    buildFindWhereFilter(where) {
        let whereQuery = {};
        if (where.filter) {
            whereQuery = {
                OR: {
                    username: { contains: where.filter },
                    name: { contains: where.filter },
                    email: { contains: where.filter },
                },
            };
        }
        return whereQuery;
    }
}
exports.UserRepository = UserRepository;
