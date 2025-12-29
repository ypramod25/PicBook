import { createUser } from "../repositories/userRepo.js";

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