import { NextFunction, Request, Response } from "express"

// We define an interface for custom errors that extends the Error interface.
// This interface includes an optional ‘status’ field for custom HTTP status codes.
interface IError extends Error {
  status?: number
}

export const errorHandlerMiddleware = (
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const customError = {
    msg: "Something went wrong, please try again",
    statusCode: 500,
  }

  const status = err.status || customError.statusCode
  const message = err.message || customError.msg

  res.status(status).json({
    success: false, // We indicate that the request was unsuccessful
    message,
  })
}
