import { JWT_SECRET } from "../config/serverConfig.js";
import { checkIfUserExistsService } from "../services/userService.js";
import { verifyJwtToken } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
    //1. check if jwt is passed in headers
    const token = req.headers["x-access-token"];
    
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Access token missing"
        });
    }

    //2. verify the token
    try {
        const response = verifyJwtToken(token, JWT_SECRET);
        const doesUserExist = await checkIfUserExistsService(response.email);
        if(!doesUserExist) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = response; //attach the user info to request object
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid access token"
        });
    }
}

export const isAdmin = async (req, res, next) => {
    // Check if user role is admin
    if(req.user.role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: "You are not authorized to perform this action"
        });
    }
    next();
}