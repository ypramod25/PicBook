import mongoose from "mongoose";
import user from "./user";

const likeSchema = new mongoose.Schema({
    onModel: {
        type: String,
        required: true,
        enum: ["Post", "Comment"]
    },
    likeableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: user
    }
}, { timestamps: true });

const like = mongoose.model('Like', likeSchema);

export default like;