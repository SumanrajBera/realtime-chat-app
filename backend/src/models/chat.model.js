import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const chatModel = mongoose.model("Chat", chatSchema)

export default chatModel;