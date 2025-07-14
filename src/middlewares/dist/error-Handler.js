"use strict";
exports.__esModule = true;
var http_errors_1 = require("http-errors");
var logger_1 = require("../logger");
var helper_1 = require("../helpers/helper");
/**
 * catch all errors and return a custom  error message
 * @param err error object
 * @param req Reguest object
 * @param res Response
 * @param next next function
 */
var errorHandler = function (err, req, res, next) {
    // Log the error using Rollbar and logger
    logger_1.logger.error("Error: " + err.message, {
        stack: err.stack,
        path: req.path,
        method: req.method
    });
    logger_1.rollbar.error(err, req);
    var statusCode = err.statusCode || err.status || 500;
    //Send appropriate response based on enivronment 
    if (process.env.NODE_ENV === 'production') {
        //In production, don't leak error details for 500 errors
        helper_1.constructHTTPResponse(null, http_errors_1["default"](500, ' Internal Server Error'), 500)(res);
        //this is an alternative way to handle errors without the use of constructHTTPResponse
        // if (statusCode === 500) {
        //   return res.status(500).json({
        //     error: {
        //       message: 'Internal Server Error',
        //     statusCode: 500
        //}
        // });
        // }
    }
    //for other errors or in development, send details
    helper_1.constructHTTPResponse(null, err instanceof http_errors_1["default"].HttpError
        ? err
        : http_errors_1["default"](statusCode, err.message || 'Server Error'), statusCode)(res);
    //res.status(statusCode).json({
    //  error: {
    //    message: err.message || 'Something went wrong',
    //  statusCode
    //}
    //});
    //Another approach of using the constructHTTPRespone
    //if(err instanceof createError.HttpError){
    // return constructHTTPResponse(null, err, err.status)(res);
    // }
    //return constructHTTPResponse(null, createError(500, 'Server Error'), 500)(res)
};
exports["default"] = errorHandler;
