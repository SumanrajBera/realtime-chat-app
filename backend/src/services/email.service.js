import nodemailer from 'nodemailer'
import { config } from '../config/config.js'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.GOOGLE_USER,
        pass: config.GOOGLE_APP_PASSWORD
    }
})

try {
    await transporter.verify()
    console.log("Transporter ready for sending email")
} catch (err) {
    console.error("Transporter not working for sending email")
}

export default transporter;