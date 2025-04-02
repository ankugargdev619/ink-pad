import { Request, Response } from "express";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { SALT_ROUNDS, JWT_PASS } from "@repo/common/secrets";
import { log } from "console";

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
        bcrypt.hash(password, 5, async (err, hash) => {
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

// /reset-password
const resetLinkController = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            res.status(401).json({
                error: "You are not registered"
            })
            return;
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        const expiresAt = Date.now() + (15 * 60 * 1000);

        const userToken = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                resetToken: resetToken,
                expiresAt: new Date(expiresAt)
            },
            select: {
                resetToken: true
            }
        })
        // TODO, send password with link to email

        res.json({
            message: "Reset password token is generated!",
            resetToken: userToken.resetToken
        })
        return

    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: "Error generating reset link"
        })
        return
    }

}

// /update-password/:resetToken
const updatePassController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const resetToken = req.params.tokenId;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            resetToken: true,
            expiresAt: true
        }
    })

    if (!user || !user.resetToken || !user.expiresAt) {
        res.status(404).json({
            error: "Invalid token, please generate a new token"
        })
        return
    }

    if (Date.now() > user.expiresAt.getTime()) {
        res.status(403).json({
            error: "Link expired, please try again later"
        })
        return
    }

    if (resetToken != user.resetToken) {
        res.status(403).json({
            error: "Inavlid token, please try generating new token"
        })
        return
    }

    console.log(SALT_ROUNDS, password);
    try {
        const hashPass = await bcrypt.hash(password, 5);
        const updatedUser = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: hashPass,
                expiresAt: new Date(Date.now())  // User should not be able to use same token twice
            }
        })

        res.json({
            message: "Password updated successfully!"
        })
        return
    } catch (e) {
        console.error(e);
        res.status(400).json({
            message: "Error updating password!"
        })
        return
    }
}

export {
    registerController,
    authController,
    getProfileController,
    setProfileController,
    resetLinkController,
    updatePassController
}