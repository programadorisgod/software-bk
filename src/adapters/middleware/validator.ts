import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { NextFunction, Request, Response } from "express"

// Function that creates a middleware to validate a DTO (Data Transfer Object).
// The middleware converts the body of the request into an instance of the specified DTO and validates that instance.
export const validateDto = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(DtoClass, req.body)

    //we check if it complies with the policies of our dto
    const errors = await validate(dtoInstance)

    //if it contains errors, we send the corresponding error messages

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors
          .map((err) => Object.values(err.constraints || {}))
          .flat(),
      })
    }
    
    //if everything is OK, we move on to the controller
    req.body = dtoInstance
    next()
    return
  }
}
