import { Router } from "express";
import {
    registerController,
    authController,
    getProfileController,
    setProfileController,
    resetLinkController,
    updatePassController,
    generateOtpController,
    verifyOtpController
} from "../controller/userController.js";

import { checkAuth, isTokenValid, validateSchema } from "../middleware.js";
import { authenticateSchema, generateOtpSchema, profileSchema, registerSchema, resetPassSchema, updatePasswordSchema, verifyOtpSchema } from "../validators/userValidator.js";

const userRouter: Router = Router();

userRouter.post("/register", validateSchema(registerSchema), registerController);
userRouter.post("/authenticate", validateSchema(authenticateSchema), authController);

userRouter
    .get("/profile", validateSchema(profileSchema), checkAuth, getProfileController)
    .post("/profile", validateSchema(profileSchema), checkAuth, setProfileController);

userRouter.post("/reset-pass-link", validateSchema(resetPassSchema), resetLinkController)
userRouter.post("/update-password/:tokenId", validateSchema(updatePasswordSchema), isTokenValid, updatePassController)

userRouter.post("/generate-otp", validateSchema(generateOtpSchema), generateOtpController);
userRouter.post("/verify-otp", validateSchema(verifyOtpSchema), verifyOtpController);

export default userRouter;