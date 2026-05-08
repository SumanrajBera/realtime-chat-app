import { Router } from "express";
import jwt from 'jsonwebtoken'
import userModel from "../models/auth.model.js";
import { config } from '../config/config.js'
import { sendEmail } from "../utils/sendEmail.js";
const authRouter = Router()

/**
 * @function sendToken
 * @description This function is used for dry code so that token is sent on both register and login
 */

function sendToken(user, message, status, res) {
    const token = jwt.sign({
        username: user.username,
        id: user._id
    }, config.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("token", token)

    res.status(status).json({ message })
}

/**
 * @route /api/auth/register
 * @method POST
 * @description For registration of user where we save the user data in db
 */
authRouter.post("/register", async (req, res) => {
    try {
        let { username, email, password } = req.body

        const userExist = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        })

        if (userExist) {
            let verified = "Please verify your email!"
            if (userExist.isVerified) verified = ""
            return res.status(409).json({
                message: "User with such email or username already exist. " + verified
            })
        }

        const user = await userModel.create({
            username,
            email,
            password
        })

        try {
            await sendEmail(user)
        } catch (err) {
            console.error("Email sending failed:", err)
            return res.status(201).json({
                message: "User Registration Succesful. Please log in and request a new one."
            })
        }

        return res.status(201).json({
            message: "User Registration Successful"
        })

    } catch (err) {
        console.error("Error while registration", err)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

/**
 * @route /api/auth/login
 * @method POST
 * @description For logging user
 */
authRouter.post("/login", async (req, res) => {
    try {
        const { identifier, password } = req.body

        const user = await userModel.findOne({
            $or: [
                { username: identifier }, { email: identifier }
            ]
        }).select('+password')

        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email!"
            })
        }

        sendToken(user, "Login successfully", 200, res)

    } catch (err) {
        console.error("Login error", err)
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
})

/**
 * @route /api/auth/verify-email
 * @method GET
 * @description For verifying email
 */
authRouter.get("/verify-email", async (req, res) => {
    try {
        const token = req.query.token;

        if (!token) {
            return res.status(400).json({ message: "Token is required" })
        }

        let decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findOne({ email: decoded.email })

        if (!user) {
            return res.status(400).json({
                message: "User was either deleted or doesn't exist"
            })
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "User is already verified. Please Login!"
            })
        }

        user.isVerified = true;
        await user.save()

        return res.status(200).json({
            message: "User Verification Succesful. Please login!"
        })
    } catch (err) {
        console.error("Error while verifying email", err);
        if (err.name === "JsonWebTokenError") return res.status(400).json({
            message: "Token invalid or expired"
        })
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

/**
 * @route /api/auth/resend-email
 * @method POST
 * @description For resending email
 */
authRouter.post("/resend-email", async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User was either deleted or doesn't exist"
            })
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "User is already verified. Please Login!"
            })
        }

        try {
            await sendEmail(user)
            return res.status(200).json({
                message: "Email sent successfully."
            })
        } catch (err) {
            console.error("Email sending failed:", err)
            return res.status(500).json({
                message: "Please retry after some time."
            })
        }
    } catch (err) {
        console.error("Error while resending email", err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

export default authRouter;