import { Server } from "socket.io";
import { registerHandlers } from "./socket.handlers.js";
import cookieParser from "cookie-parser";

let io;

export function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    })

    io.engine.use(cookieParser());

    io.on("connection", (socket) => {
        registerHandlers(io, socket); 
    });

    console.log("Socket initialized")
}

export function getIO() {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
}