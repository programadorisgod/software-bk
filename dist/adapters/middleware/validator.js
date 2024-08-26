var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
// Function that creates a middleware to validate a DTO (Data Transfer Object).
// The middleware converts the body of the request into an instance of the specified DTO and validates that instance.
export const validateDto = (DtoClass) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const dtoInstance = plainToInstance(DtoClass, req.body);
        //we check if it complies with the policies of our dto
        const errors = yield validate(dtoInstance);
        //if it contains errors, we send the corresponding error messages
        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors
                    .map((err) => Object.values(err.constraints || {}))
                    .flat(),
            });
        }
        //if everything is OK, we move on to the controller
        req.body = dtoInstance;
        next();
        return;
    });
};
