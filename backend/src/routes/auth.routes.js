import { Router } from "express";
import { loginController, registerController, resendEmailController, verifyEmailController } from "../controllers/auth.controller.js";
const authRouter = Router()

/**
 * @route /api/auth/register
 * @method POST
 * @description For registration of user where we save the user data in db
 */
authRouter.post("/register", registerController)

/**
 * @route /api/auth/login
 * @method POST
 * @description For logging user
 */
authRouter.post("/login", loginController)

/**
 * @route /api/auth/verify-email
 * @method GET
 * @description For verifying email
 */
authRouter.get("/verify-email", verifyEmailController)

/**
 * @route /api/auth/resend-email
 * @method POST
 * @description For resending email
 */
authRouter.post("/resend-email", resendEmailController)

export default authRouter;