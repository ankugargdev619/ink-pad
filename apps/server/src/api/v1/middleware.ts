import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ZodIssue, ZodType } from "zod";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token;
    try {
    } catch (error) {

    }
    next();
}

const validateSchema = (schema: ZodType) => {
    return function (req: Request, res: Response, next: NextFunction): void {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const error = Object.entries(result.error.format());
            const formattedError = error.map((key, value) => {
                if (key[0] != "_errors") {
                    return {
                        field: key[0],
                        message: key[1]
                    }
                }
            })
            res.status(400).json(formattedError)
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