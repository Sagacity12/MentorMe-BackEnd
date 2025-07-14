import http from "http";
import { ErrorRequestHandler } from "express";
import { createExpressApp, createSocketServer } from "./servers";
import { logger } from "./logger";
import { connectDB } from "./servers/mongoDB/connectDB";
import client from "./servers/mongoDB/redisConnectDB";
import errorHandler from "./middlewares/error-Handler";
import createError from "http-errors"; 

 

const PORT = process.env.PORT || 3000 

/**
 * create the http  server here and start the server 
 */
export const startServer = async () => {
    await connectDB(String(process.env.MONGO_URL));

    await client.connect();
    logger.info("Connected to Redis");

    const app = await createExpressApp();

    // Error handlers should be placed before creating the server
   app.all("*", (req, res, next) => {
        next(createError(404, "Not Found"));
    });

    app.use(errorHandler as ErrorRequestHandler);

    const server = http.createServer(app); 
    const io = await createSocketServer(server);

    server.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}

export default startServer;