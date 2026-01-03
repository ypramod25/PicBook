import mongoose from 'mongoose';
import user from './user';
import like from './like';

const commentSchema = new mongoose.Schema({
    content: {// comment text
        type: String,
        required: true,
        minLength: 1
    },
    userId: {// user who made the comment
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: user
    },
    onModel: {// indicates whether the comment is on a Post or another Comment
        type: String,
        required: true,
        enum: ["Post", "Comment"]
    },
    commentableId: {// ID of the Post or Comment being commented on
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    },
    reply: [// replies to this comment
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: comment
        }
    ],
    likes: [// likes on this comment
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: like
        }
    ]
}, { timestamps: true });

const comment = mongoose.model('Comment', commentSchema);

export default  comment;