import { Request, Response } from "express";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS, JWT_PASS } from "@repo/common/secrets";
import { userInfo } from "os";

// /users/register
const registerController = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    // check if user already exists

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (user) {
        res.status(400).json({
            error: "User is already registered!"
        })
    } else {
        // Hash the password
        bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
            if (err) {
                console.log(`Error hashing password`)
                console.error(err);
                res.status(400).json({
                    error: "Error creating account!"
                })
            } else {
                // Create an account
                const user = await prisma.user.create({
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

// /users/authenticate
const authController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        });

        if (user) {
            const validPass = await bcrypt.compare(password, user.password);
            if (!validPass) {
                res.status(401).json({
                    error: "Incorrect password, please check!"
                })
            } else {
                const token = jwt.sign({
                    userId: user.id
                }, JWT_PASS as string,
                    {
                        expiresIn: 3600
                    })

                res.json({
                    message: "Login successful!",
                    id: user.id,
                    token
                });
            }
        } else {
            res.status(404).json({
                error: "Account not found"
            })
        }
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: "Something went wrong!"
        })
    }
}

// /user/profile
const getProfileController = async (req: Request, res: Response) => {
    const userId = req?.userId;
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                profile: true,
                colorTheme: true,
                fontTheme: true
            }
        });
        res.json({
            ...user
        });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: "Something went wrong"
        })
    }
}

// /user/profile
const setProfileController = async (req: Request, res: Response) => {
    const body = req.body;

    // Update the data
    try {
        const user = await prisma.user.update({
            where: {
                id: req?.userId
            },
            data: body,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                profile: true,
                colorTheme: true,
                fontTheme: true
            }
        });
        res.json({ ...user });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Error updating profile" });
    }
}

// /user/:userId
const resetLinkController = (req: Request, res: Response) => {
    // TODO implement sending email with the link
    res.json({ message: "Reset link" });
}

// /update-password
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