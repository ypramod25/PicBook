import { signupUserService } from "../services/userService.js";

export async function signup(req, res) {
    try {
        const userData = req.body;
        const newUser = await signupUserService(userData);
        return res.status(201).json({
            success: true,
            message: "User added successfully",
            user: newUser
        });
    } catch (error) {
        if(error.status){//known error from service (like duplicate user)
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: "Error adding user",
            error: error.message
        });
    }
}