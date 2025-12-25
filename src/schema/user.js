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
        required: true,
        unique: true,
        minLength: 15,
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

const user = mongoose.model('User', userSchema); // user collection

export default user;