import user from '../schema/user';

export const findUserByEmail = async (email) => {
    try {
        const user = await user.findOne({email});
        return user;
    } catch (error) {
        throw new Error('Error finding user by email');
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