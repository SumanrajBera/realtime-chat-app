import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not present in environment variable")
}

if(!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not present in environment variable")
}

if(!process.env.GOOGLE_USER) {
    throw new Error("GOOGLE_USER is not present in environment variable")
}

if(!process.env.GOOGLE_APP_PASSWORD) {
    throw new Error("GOOGLE_APP_PASSWORD is not present in environment variable")
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_USER: process.env.GOOGLE_USER,
    GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD
}