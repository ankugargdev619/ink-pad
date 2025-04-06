import { Router } from "express";

import { checkAuth, isTokenValid, validateSchema } from "../middleware.js";
import { authenticateSchema, generateOtpSchema, profileSchema, registerSchema, resetPassSchema, updatePasswordSchema } from "../validators/userValidator.js";
import { authController, generateOtpController, getProfileController, registerController, resetLinkController, setProfileController, updatePassController } from "../controller/userController.js";

const userRouter: Router = Router();

userRouter.post("/register", validateSchema(registerSchema), registerController);
userRouter.post("/authenticate", validateSchema(authenticateSchema), authController);

userRouter
    .get("/profile", validateSchema(profileSchema), checkAuth, getProfileController)
    .post("/profile", validateSchema(profileSchema), checkAuth, setProfileController);

userRouter.post("/reset-pass-link", validateSchema(resetPassSchema), resetLinkController)
userRouter.post("/update-password/:tokenId", validateSchema(updatePasswordSchema), isTokenValid, updatePassController)

userRouter.post("/generate-otp", validateSchema(generateOtpSchema), generateOtpController);

export default userRouter;