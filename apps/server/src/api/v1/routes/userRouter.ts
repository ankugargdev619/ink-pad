import { Router } from "express";
import {
    registerController,
    authController,
    getProfileController,
    setProfileController,
    resetLinkController,
    updatePassController
} from "../controller/userController.js";

import { checkAuth, isTokenValid, validateSchema } from "../middleware.js";
import { authenticateSchema, profileSchema, registerSchema } from "../validators/userValidator.js";

const userRouter: Router = Router();

userRouter.post("/register", validateSchema(registerSchema), registerController);
userRouter.post("/authenticate", validateSchema(authenticateSchema), authController);

userRouter
    .get("/profile", validateSchema(profileSchema), checkAuth, getProfileController)
    .post("/profile", validateSchema(profileSchema), checkAuth, setProfileController);

userRouter.post("/reset-pass-link", resetLinkController)
userRouter.post("/update-password/:tokenId", isTokenValid, updatePassController)

export default userRouter;