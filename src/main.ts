import { config } from "dotenv";
import { logger, rollbar } from "./logger";


/**
 * load the env variables and start the whole server 
 */
const main = async () => {
    config();
    const start = await import("./app");
    await start.startServer();
    logger.info("Server started successfully");
};

main().catch((error) => {
    logger.error("Error starting the server:", error);
    rollbar.error(error);
    process.exit(1);
});