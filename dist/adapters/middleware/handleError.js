export const errorHandlerMiddleware = (err, _req, res, _next) => {
    const customError = {
        msg: "Something went wrong, please try again",
        statusCode: 500,
    };
    const status = err.status || customError.statusCode;
    const message = err.message || customError.msg;
    res.status(status).json({
        success: false, // We indicate that the request was unsuccessful
        message,
    });
};
