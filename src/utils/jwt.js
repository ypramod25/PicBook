import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig';

export const generateJwtToken = (payload, secret = JWT_SECRET, options = {}) => {
    return jwt.sign(payload, secret, options);
}

export const verifyJwtToken = (token, secret = JWT_SECRET, options = {}) => {
    try {
        return jwt.verify(token, secret, options);
    } catch (error) {
        throw error;
    }
}