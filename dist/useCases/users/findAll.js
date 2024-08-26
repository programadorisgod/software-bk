var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Failure, Success } from "@utils/results/results";
export class UseCaseFindAllUser {
    constructor(userRepository) {
        this.repository = userRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.repository.findAll();
                if (users instanceof Error) {
                    return Failure(users.message);
                }
                return Success(users);
            }
            catch (error) {
                return Failure("An unexpected error occurred");
            }
        });
    }
}
