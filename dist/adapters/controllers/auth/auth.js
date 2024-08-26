var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AuthController {
    constructor(useCaseLogin, usecaseRegister) {
        this.useCaseAuthLogin = useCaseLogin;
        this.usecaseAuthRegister = usecaseRegister;
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const userCreated = yield this.usecaseAuthRegister.create(user);
            if (!userCreated.success) {
                const error = {
                    status: 403,
                    message: userCreated.error,
                };
                return next(error);
            }
            res.status(200).json({ message: userCreated.value });
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const userLogged = yield this.useCaseAuthLogin.login(user);
            if (!userLogged.success) {
                const error = {
                    status: 403,
                    message: userLogged.error,
                };
                return next(error);
            }
            res.status(200).json({ message: userLogged.value });
        });
    }
}
