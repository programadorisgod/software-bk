import { NextFunction, Request, Response } from "express";
interface IError extends Error {
    status?: number;
}
export declare const errorHandlerMiddleware: (err: IError, _req: Request, res: Response, _next: NextFunction) => void;
export {};
