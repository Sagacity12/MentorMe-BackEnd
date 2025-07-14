import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import { logger, rollbar } from "../logger";
import { constructHTTPResponse } from "../helpers/helper";

interface HttpError extends Error {
    statusCode?: number;
    status?: number;
    expose?: boolean;
    headers?: {
        [key: string]: string;
    };
}

/**
 * catch all errors and return a custom  error message 
 * @param err error object 
 * @param req Reguest object 
 * @param res Response 
 * @param next next function 
 */
const errorHandler =(err: HttpError, req: Request, res: Response, next: NextFunction) => {
    // Log the error using Rollbar and logger

    logger.error(`Error: ${err.message}`, {
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    rollbar.error(err, req);

    const statusCode = err.statusCode || err.status || 500;

    //Send appropriate response based on enivronment 
    if (process.env.NODE_ENV === 'production') {
        //In production, don't leak error details for 500 errors
         constructHTTPResponse (
            null,
            createError(500, ' Internal Server Error'),
            500
        )(res);

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
     constructHTTPResponse(
        null,
        err instanceof createError.HttpError 
             ?err 
             : createError(statusCode, err.message || 'Server Error'),
             
        statusCode
    )(res);

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

export default errorHandler