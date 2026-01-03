import { createComment } from "../controllers/commentController.js";
import { findCommentById } from "../repositories/commentRepo.js";
import { findPostById } from "../repositories/postRepo.js";

export const createCommentService = async (content, userId, onModel, commentableId) => {
    try {
        let parent = await fetchCommentParent(onModel, commentableId);
        if (!parent) {
            throw {
                message: `${onModel} with ID ${commentableId} not found`,
                status: 404
            }
        }
        const newComment = await createComment(content, userId, onModel, commentableId);
        addCommentToParent(parent, onModel, newComment._id);
        await parent.save();
        return newComment;

    } catch (error) {
        throw new Error('Error in createCommentService');
    }
}

export const findCommentByIdService = async (commentId) => {
    try {
        const foundComment = await findCommentById(commentId);
        if(!foundComment){
            throw {
                message: `Comment with ID ${commentId} not found`,
            }
        }
        return foundComment;
    } catch (error) {
        throw new Error('Error in findCommentByIdService');
    }
}

const addCommentToParent = async (parent, onModel, commentId) => {
    if(onModel === "Post"){
        parent.comments.push(commentId);
    } else if(onModel === "Comment"){
        parent.reply.push(commentId);
    }
}

const fetchCommentParent = async (onModel, commentableId) => {
    try {
        if (onModel === "Post") {
            // Implement findPostById in postRepo
            const post = await findPostById(commentableId);
            return post;
        } else if (onModel === "Comment") {
            // Implement findCommentById in commentRepo and import it here
            const comment = await findCommentById(commentableId);
            return comment;
        }
    } catch (error) {
        throw new Error('Error fetching comment parent');
    }
}