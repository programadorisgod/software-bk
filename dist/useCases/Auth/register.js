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
export class UseCaseAuthRegister {
    constructor(userRepository) {
        this.repository = userRepository;
    }
    create(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new User();
                newUser.idUser = userDto.id;
                newUser.name = userDto.name;
                newUser.lastName = userDto.lastName;
                newUser.email = userDto.email;
                newUser.phoneNumber = userDto.phoneNumber;
                newUser.password = userDto.password;
                newUser.faceImage = [];
                newUser.age = 0;
                newUser.movement = [];
                newUser.bank = {};
                newUser.credit = [];
                const userCreated = yield this.repository.save(newUser);
                if (userCreated instanceof Error) {
                    return Failure(userCreated.message);
                }
                return Success("User created succesfully");
            }
            catch (error) {
                return Failure("An unexpected error occurred");
            }
        });
    }
}
