import mongoose, { mongo } from 'mongoose'
import user from './user.js'
import comment from './comment.js';
import like from './like.js';

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
        minLength: 5
    },
    image: {// image url from cloudinary
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: comment
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: like
        }
    ]
}, { timestamps: true }
); // createdAt and updatedAt)

const post = mongoose.model('Post', postSchema); // post collection

export default post;