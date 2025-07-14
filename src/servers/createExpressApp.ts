import express from 'express';
import limit from 'express-rate-limit';
import session from 'express-session'; 
import connectMongo from 'connect-mongodb-session'
import helmet, { HelmetOptions } from 'helmet';

//import xss from 'xss-clean'; 

// Simple logger using console, replace with your preferred logger if needed
const logger = {
    error: (...args: any[]) => console.error(...args),
};

const helmetOptions: HelmetOptions = {
    contentSecurityPolicy: false, // Disable CSP for simplicity, adjust as needed
    crossOriginEmbedderPolicy: false, // Disable COEP for simplicity, adjust as needed
}

const limiter = limit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});


export const createExpressApp  = async () => {
    const app = express()

    const mongoStore = connectMongo(session);

    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error('MONGO_URL environment variable is not defined');
    }
    const store = new mongoStore({
        uri: mongoUrl,
        collection: 'sessions',
    });

    store.on("error", (err: any) => logger.error(err));

    app.set('trust proxy', 1); // Trust first proxy, useful if behind a reverse proxy

    app.use(express.json({ limit: "50mb" }));
    app.use(limiter); 
    app.use(helmet(helmetOptions));
    app.use(helmet.hidePoweredBy());
    
    //Reason... this because there was an error with the x-powered-by header and this required a middleware function to be used
    //app.use("x-powered-by");

    //app.use(xss()); // Prevent XSS attacks
    app.use(express.urlencoded({ extended: true }));

    //app.use(limiter);

    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
        throw new Error('SESSION_SECRET environment variable is not defined');
    }
    app.use(
        session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false,
            store: store,
        })
    );




    return app;
};