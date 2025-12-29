import user from '../schema/user.js';

export const findUserByEmail = async (email) => {
    try {
        const user = await user.findOne({email});
        return user;
    } catch (error) {
        throw new Error('Error finding user by email');
    }
}

export const createUser = async (userData) => {
    try {
        const newUser = new user(userData);
        return await newUser.save();
    } catch (error) {
        throw new Error('Error inserting user');
    }
}

export const findAllUsers = async () => {
    try {
        const users = await user.find({});      
        return users;
    } catch (error) {
        throw new Error('Error finding all users');
    }
}