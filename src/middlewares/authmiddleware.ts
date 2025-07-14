import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { jwtVerify } from '../helpers/helper';
import { logger } from '../logger';
import createHttpError from 'http-errors';
import { isTokenBlacklisted } from '../helpers/blacklistedTokens';

/**
 * Extent Express Request to include user property 
 */
declare global {
    namespace Express {
        interface Request {
            user?: any;
            token?: string;
        }
    }
}

/**
 * Authentication middleware to protect routes 
 * Verifies JWT token from Authorization header 
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // Get token from Authorization header 
        const authHeader = req.headers.authorization;

        const tokenHeader = Array.isArray(authHeader) ? authHeader[0] : authHeader;

        if (!tokenHeader || !tokenHeader.startsWith('Bearer')) {
            return next(createError(401, 'No authentication token provided'));
        }

        const token = tokenHeader.split(' ')[1];

        if (!token) {
            return next(createError(401, 'Invalide authentication token'));
        }

        //Check if token is blacklisted 
        const blacklisted = await isTokenBlacklisted(token);
        if (blacklisted) {
            return next(createHttpError(401, ' Token has been revoked '));
        }

        // Verify token using jwtVerify helper function
        const decodedToken = jwtVerify(token);

        req.user = decodedToken;

        next();
    }catch(error: any){
        logger.error('Authentication error:', error);
        return next(createHttpError(401, 'Authentication failed'));
    }
};

/**
 * Role-based authorization middleware 
 */
export const authorizeRoles = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(createHttpError(401, 'You do not have permission to access this resource'));
        }

        const userRole = req.user.role; 

        if (!userRole || !allowedRoles.includes(userRole)) {
            return next(createHttpError(403, 'Insufficient permissions for this operation'));
        }

        next();
    };
};

export default { authMiddleware, authorizeRoles };