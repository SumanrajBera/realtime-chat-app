/**
 * @routes register and login
 * @count 2
 * @description For registration and login of user
 */
import { Router } from "express";
import jwt from 'jsonwebtoken'
import userModel from "../models/auth.model.js";
import { config } from '../config/config.js'
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

    res.status(status).json({
        message,
        user
    })
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
            return res.status(409).json({
                message: "User with such email or username already exist"
            })
        }

        const user = await userModel.create({
            username,
            email,
            password
        })

        const userObj = user.toObject()
        delete userObj.password

        sendToken(userObj, "User registered successfully", 201, res)

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
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

        const userObj = user.toObject()
        delete userObj.password

        sendToken(userObj, "User logged in successfully", 200, res)

    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        })
    }
})

export default authRouter;