import { Request, Response } from "express"

const registerController = (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    res.json({ message: "Register" });
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