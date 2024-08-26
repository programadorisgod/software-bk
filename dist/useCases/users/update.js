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
import { Failure, Success } from "@utils/results/results";
export class UseCaseUpdateUser {
    constructor(userRepository) {
        this.repository = userRepository;
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.repository.findById(id);
                if (userExists instanceof Error || !userExists) {
                    return Failure((userExists === null || userExists === void 0 ? void 0 : userExists.message) || "user not found");
                }
                const newUser = new User();
                newUser.idUser = id;
                newUser.name = data.name;
                newUser.email = data.email;
                newUser.password = data.password;
                newUser.phoneNumber = data.phoneNumber;
                newUser.age = data.age;
                newUser.bank = {};
                newUser.credit = [];
                newUser.movement = [];
                newUser.faceImage = [];
                const user = yield this.repository.update(id, newUser);
                if (user instanceof Error) {
                    return Failure(user.message);
                }
                return Success(user);
            }
            catch (error) {
                return Failure("An unexpected error occurred");
            }
        });
    }
}
