import mongoose from 'mongoose';
import user from './user';
import like from './like';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 1
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: user
    },
    onModel: {
        type: String,
        required: true,
        enum: ["Post", "Comment"]
    },
    commentableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    },
    reply: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: like
        }
    ]
}, { timestamps: true });

const comment = mongoose.model('Comment', commentSchema);

export default  comment;