import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// checkAuth : Checks if the user is authenticated
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token;
    try {
    } catch (error) {

    }
    next();
}

// hasNoteAccess : Check if the user has access to the note
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
    isTokenValid
}