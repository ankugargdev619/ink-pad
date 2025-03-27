import { Request, Response } from "express";
import { client } from "@repo/db/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 5;

const registerController = async (req: Request, res: Response) => {
    const body = req.body;
    const email: string = body.email;
    const password: string = body.password;
    const firstName: string = body.firstName;
    const lastName: string = body.lastName;
    // check if user already exists

    const user = await client.user.findFirst({
        where: {
            email
        }
    });
    
    if (user) {
        res.json({
            message: "User is already registered!"
        })
    } else {
        // Hash the password
        bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
            if (err) {
                console.log(`Error hashing password`)
                console.error(err);
                res.status(400).json({
                    message: "Error creating account!"
                })
            } else {
                // Create an account
                const user = await client.user.create({
                    data: {
                        email,
                        firstName,
                        lastName,
                        password: hash
                    },
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true
                    }
                });

                res.json({
                    message: "User is registered successfully!",
                    user
                })
            }
        })
    }
}

const authController = (req: Request, res: Response) => {

    res.json({ message: "Authenticate" });
}

const getProfileController = (req: Request, res: Response) => {

    res.json({ message: "Profile Details" });
}

const setProfileController = (req: Request, res: Response) => {

    res.json({ message: "Profile Details" });
}

const resetLinkController = (req: Request, res: Response) => {

    // TODO implement sending email with the link
    res.json({ message: "Reset link" });
}

const updatePassController = (req: Request, res: Response) => {
    res.json({ message: "Update Password" });
}

export {
    registerController,
    authController,
    getProfileController,
    setProfileController,
    resetLinkController,
    updatePassController
}