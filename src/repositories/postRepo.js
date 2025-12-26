import post from '../schema/post.js';

export const createPost = async (caption, image, userId) => {
    try {
        // const newPost = await post.create({ caption, image, userId });
        const newPost = new post({ caption, image, userId });
        await newPost.save();
        return newPost;
    } catch (error) {
        throw new Error('Error creating post');
    }
}

export const findPostById = async (postId) => {
    try {
        const post = await post.findById(postId);
        return post;
    } catch (error) {
        throw new Error('Error finding post by ID');
    }
}

export const countAllPosts = async() => {
    try{
        const count = await post.countDocuments();
        return count;
    } catch(error){
        throw new Error('Error counting all posts');
    }
}

export const findAllPosts = async (offset, limit) => {
    try {
        // Fetch all posts with pagination , sorted by creation date descending
        const posts = await post.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
        return posts;
    } catch (error) {
        throw new Error('Error finding all posts');
    }
}

export const deletePostById = async (postId) => {
    try {
        await post.findByIdAndDelete(postId);
    } catch (error) {
        throw new Error('Error deleting post by ID');
    }
}
