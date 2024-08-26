var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "@Entity/user/user";
export class UserRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User.find({ relations: { movement: true, credit: true, bank: true } });
            return users;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findOneBy({ idUser: id });
            return user;
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User.save(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User.findOneBy({ idUser: id });
            const userUpdated = yield User.save(data);
            return userUpdated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User.delete({ idUser: id });
        });
    }
}
