import mongoose, { mongo } from 'mongoose'
import user from './user'

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
    }
})