import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'


const app = express()

app.use(express.json())
app.use(cookieParser())
// app.use(cors())

// Routes
app.use(authRouter, "/api/auth")

export default app