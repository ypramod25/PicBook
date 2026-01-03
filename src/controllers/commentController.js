import { createCommentService, findCommentByIdService } from "../services/commentService.js";

export async function createComment (req, res) {
    try {
        const { content, onModel, commentableId } = req.body;
        const userId = req.user._id;
        const newComment = await createCommentService(content, userId, onModel, commentableId);
        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: newComment
        });
    } catch (error) {
        if(error.status){//known error from service
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        });
    }
}

export async function getCommentById (req, res) {
    try {
        const commentId = req.params.id;
        const foundComment = await findCommentByIdService(commentId);
        return res.status(200).json({
            success: true,
            message: "Comment fetched successfully",
            data: foundComment
        });
    } catch (error) {
        if(error.status){//known error from service
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        });
    }
}