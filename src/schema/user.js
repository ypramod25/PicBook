import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        minLength: 5
    },
    email: {
        type: String,
        requrire: true,
        unique: true,
        minLength: 5,
        validate: {
            validator: function(emailValue) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
}, { timestamps: true });
// timestamps will add createdAt and updatedAt fields automatically

const postSchema = new mongoose.Schema({
    userId: {// foreign key
        type: mongoose.Schema.Types.ObjectId, // type ObjectId
        ref: 'User', // reference to User model
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
    }
}, {timestamps: true});

const user = mongoose.model('User', userSchema); // user collection
const post = mongoose.model('Post', postSchema); // post collection

export default { user, post };
