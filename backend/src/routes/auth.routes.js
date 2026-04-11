/**
 * @routes register and login
 * @count 2
 * @description For registration and login of user
 */
import { Router } from "express";
import userModel from "../models/auth.model.js";
const authRouter = Router()

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

        res.status(201).json({
            message: "User registered successfully",
            user
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
})

export default authRouter;