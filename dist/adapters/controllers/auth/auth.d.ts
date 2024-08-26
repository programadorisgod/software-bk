import { NextFunction, Request, Response } from "express";
import { UseCaseAuthLogin } from "@useCases/Auth/login";
import { UseCaseAuthRegister } from "@useCases/Auth/register";
export declare class AuthController {
    private readonly useCaseAuthLogin;
    private readonly usecaseAuthRegister;
    constructor(useCaseLogin: UseCaseAuthLogin, usecaseRegister: UseCaseAuthRegister);
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
}
