import { NextFunction, Request, Response } from "express";
export declare const validateDto: (DtoClass: any) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
