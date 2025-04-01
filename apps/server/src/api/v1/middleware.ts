import { JWT_PASS } from "@repo/common/secrets";
import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ZodType } from "zod";

declare global {
    namespace Express {
        interface Request {
            userId?: number
        }
    }
}

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.status(403).json({
            error: "Please provide authorization token"
        })
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_PASS as string) as JwtPayload
        const expTime = decoded?.exp;
        const currentTime = Date.now() / 1000;

        // Check if the token has expired
        if (expTime as number < currentTime) {
            console.log("Authorization token has expired");
            res.status(401).json({
                error: "Authorization token has expired"
            })
        } else {
            console.log(decoded?.userId);
            req.userId = decoded?.userId;
            next();
        }

    } catch (e) {
        console.error(e);
        res.status(401).json({
            error: "Invalid authorization token"
        })
    }
}

const validateSchema = (schema: ZodType) => {
    return function (req: Request, res: Response, next: NextFunction): void {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const error = Object.entries(result.error.format());
            res.status(400).json(error);
        } else {
            next();
        }
    }
}

const hasNoteAccess = (req: Request, res: Response, next: NextFunction) => {
    //TODO : Verify if the user has access to certain note
    next();
}

const hasTagAccess = (req: Request, res: Response, next: NextFunction) => {
    // TODO : Verify if the user has access to the tag
    next();
}

const isTokenValid = (req: Request, res: Response, next: NextFunction) => {
    console.log("Checking validity of the token...")
    // TODO : Check if the token provide in the path parameter is still valid, check the stored value for that email
    next();
}

export {
    checkAuth,
    hasNoteAccess,
    hasTagAccess,
    isTokenValid,
    validateSchema
}