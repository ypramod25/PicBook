import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';

export const generateJwtToken = (payload, secret = JWT_SECRET, options = {}) => {
    return jwt.sign(payload, secret, options);
}

export const verifyJwtToken = (token, secret = JWT_SECRET, options = {}) => {
    try {
        return jwt.verify(token, secret, options); //this returns the payload if token is valid
    } catch (error) {
        throw error;
    }
}