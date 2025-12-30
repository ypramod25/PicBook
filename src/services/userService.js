import { createUser, findUserByEmail } from "../repositories/userRepo.js";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../utils/jwt.js";
import { JWT_SECRET } from "../config/serverConfig.js";

export const signupUserService = async (userData) => {
    try {
        const newUser = new createUser(userData);
        return await newUser.save();
    } catch (error) {
        if(error.code === 11000){ //duplicate key error code in mongodb
            throw {
                status: 400,    
                message: 'User with this email/username already exists'
            }
        }
        throw error;
    }
}

export const signinUserService = async (userDetails) => {
    try {
        //1. find user by email
        const user = await findUserByEmail(userDetails.email);
        if(!user) {
            throw {
                status: 404,
                message: 'User not found'
            }
        }
        //2. compare password
        const isPasswordValid = await bcrypt.compareSync(userDetails.password, user.password);
        if(!isPasswordValid) {
            throw {
                status: 401,
                message: 'Invalid password'
            }
        }
        //3. jwt token generation can be done 
        const token = generateJwtToken({id: user._id, email: user.email, username: user.username, role: user.role || 'user'}, JWT_SECRET, {expiresIn: '1d'});
        user.token = token; //attach token to user object

        return user;

    } catch (error) {
        throw error;
    }
}

export const checkIfUserExistsService = async (email) => {
    try {
        const user = await findUserByEmail(email);
        return user ? true : false;
    } catch (error) {
        throw error;
    }
}