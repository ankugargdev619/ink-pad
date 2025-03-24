import { Router } from "express";
import {
    registerController,
    authController,
    getProfileController,
    setProfileController,
    resetLinkController,
    updatePassController
} from "../controller/userController";
import { checkAuth, isTokenValid } from "../middleware";

const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.post("/authenticate", authController);

userRouter.get("/:id", checkAuth, getProfileController);
userRouter.post("/:id", checkAuth, setProfileController);

userRouter.post("/reset-pass-link", resetLinkController)
userRouter.post("/update-password", isTokenValid, updatePassController)

export { userRouter };