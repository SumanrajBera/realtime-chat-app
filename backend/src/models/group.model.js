import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        default: "Private Chat"
    },
    type: {
        type: String,
        required: true,
        enum: ["dm", "group"],
        default: "dm"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

groupSchema.index({})

const groupModel = mongoose.model("Group", groupSchema);

export default groupModel;