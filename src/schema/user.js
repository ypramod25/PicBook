import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

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
}, { timestamps: true });// timestamps will add createdAt and updatedAt fields automatically

userSchema.pre('save', function modifyPassword (next) {
    const user = this;

    const SALT = bcrypt.genSaltSync(9); //higher the number, more secure but slower (salt rounds)
    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashedPassword;
    next();
})

const user = mongoose.model('User', userSchema); // user collection

export default user;