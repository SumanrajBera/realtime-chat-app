import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "member"],
        required: true,
        default: "member"
    }
}, { timestamps: true })

memberSchema.index({ groupId: 1, userId: 1 }, { unique: true })
memberSchema.index({ userId: 1 })

const memberModel = mongoose.model("Member", memberSchema);

export default memberModel;