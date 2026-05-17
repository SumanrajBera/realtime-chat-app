import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import { createServer } from "http";
import { initSocket } from './socket/socket.js';


const app = express()
const httpServer = createServer(app)
initSocket(httpServer)

// Middlewares
app.use(express.json())
app.use(cookieParser())
// app.use(cors())

// Routes
app.use("/api/auth", authRouter)

export default httpServer