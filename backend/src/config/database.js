import mongoose from "mongoose";
import { config } from "./config.js";

async function connectToDB() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to DB")
    } catch (err) {
        console.log("Error connecting to DB", err)
        throw err
    }
}

export default connectToDB;