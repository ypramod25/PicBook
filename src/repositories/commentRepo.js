import comment from "../schema/comment.js"

export const createComment = async (content, userId, onModel, commentableId) => {
    try {
        const newComment = new comment.create({content, userId, onModel, commentableId, likes: [], reply: []});
        await newComment.save();
        return newComment;
    } catch (error) {
        throw new Error('Error creating comment');
    }
};

export const findCommentById = async (commentId) => {
    try {
        const foundComment = await comment.findById(commentId).populate('userId', 'username email _id').populate('likes').populate('reply');//populate user details, likes and replies
        return foundComment;
    } catch (error) {
        throw new Error('Error finding comment by ID');
    }
};
